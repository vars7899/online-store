const createHttpError = require("http-errors");
const { getChargesForOrder } = require("../functions");
const Order = require("../models/order");
const { Transaction, User } = require("../models");
const { default: mongoose } = require("mongoose");
const stripe = require("stripe")(process.env.STRIPE_TEST_SECRET_KEY);
const ULID = require("ulid");

const sendStripePublicKeyToClient = async (req, res, next) => {
  try {
    res.status(200).json({
      success: true,
      message: "stripe public key for payments",
      stripePublicKey: process.env.STRIPE_PUBLISHABLE_KEY,
    });
  } catch (err) {
    next(err);
  }
};

const generateStripeIntent = async (req, res, next) => {
  try {
    const { orderItems, shippingServiceType } = req.body;
    if (!orderItems.length || !shippingServiceType) {
      throw createHttpError(400, "Missing required field to create payment intent");
    }

    // calculate charges
    let { total } = getChargesForOrder(orderItems, shippingServiceType);
    // << convert the total to totalCents
    total = Math.trunc(total * 100);

    const payment_intent = await stripe.paymentIntents.create({
      // convert total to cents
      amount: total,
      currency: "cad",
      metadata: {
        company: "eccent",
      },
    });
    res.status(200).json({
      success: true,
      message: "Stripe Payment initiated",
      client_secret: payment_intent.client_secret,
    });
  } catch (error) {
    next(error);
  }
};

const stripePaymentWebhook = async (req, res, next) => {
  const sig = req.headers["stripe-signature"];

  if (!sig) {
    return res.status(400).json({ error: "Missing or invalid stripe signature" });
  }

  let event;

  try {
    event = stripe.webhooks.constructEvent(req.body, sig, process.env.STRIPE_WEBHOOK_KEY);
  } catch (err) {
    return res.status(400).json({ error: "Invalid stripe signature" });
  }

  try {
    // >> Handle events
    switch (event.type) {
      case "charge.succeeded":
        const pay = event.data.object;
        if (event.data.object.metadata.paymentType === "walletPayment") {
          // Update transaction state to debited
          const trans = await Transaction.findOneAndUpdate(
            { paymentId: pay.payment_intent },
            {
              $set: {
                transactionState: "debit",
              },
            },
            { new: true }
          );
          // Update User wallet credits
          await User.findOneAndUpdate(
            {
              _id: trans.user,
            },
            {
              $inc: {
                "wallet.balance": pay.amount / 100,
              },
            },
            {
              new: true,
            }
          );
        } else {
          await Order.findOneAndUpdate(
            { paymentIntent: pay.payment_intent },
            {
              $set: {
                orderState: "Paid",
                paymentIntent: "",
                "paymentDetails.paymentDate": pay.created,
                "paymentDetails.paymentStatus": pay.status,
                "paymentDetails.paymentAmount": pay.amount / 100,
                "paymentDetails.paymentId": pay.id,
                "paymentDetails.receiptUrl": pay.receipt_url,
              },
            },
            { new: true }
          );
        }
      // break;
      default:
        console.log(`Unhandled event type ${event.type}`);
    }
    res.status(200).json({ received: true });
  } catch (err) {
    console.log(err);
    next(err);
  }
};

const generateStripeIntentForWallet = async (req, res, next) => {
  try {
    const { amount } = req.body;

    const payment_intent = await stripe.paymentIntents.create({
      // convert total to cents
      amount: amount * 100,
      currency: "cad",
      metadata: {
        company: "eccent",
        paymentType: "walletPayment",
      },
    });
    res.status(200).json({
      success: true,
      message: "Stripe Payment initiated for wallet payment",
      client_secret: payment_intent.client_secret,
    });
  } catch (error) {
    next(error);
  }
};

const payOrderWithWallet = async (req, res, next) => {
  try {
    const { orderId } = req.body;

    if (!orderId || mongoose.isValidObjectId(orderId)) {
      throw createHttpError(404, "Invalid order, No order exist");
    }

    const existingOrder = await Order.findById(orderId);

    if (existingOrder.bill.total < 0) {
      throw createHttpError(400, "Invalid order total");
    }

    if (existingOrder.bill.total > req.user.wallet.balance) {
      throw createHttpError(400, "Insufficient balance, Please try other payment method.");
    }

    await User.findByIdAndUpdate(req.user._id, {
      $inc: { "wallet.balance": -1 * existingOrder.bill.total },
    });

    await Order.findOneAndUpdate(
      { _id: orderId },
      {
        $set: {
          orderState: "Paid",
        },
      },
      { new: true }
    );
    // Update transaction state to debited
    await Transaction.create({
      user: req.user._id,
      paymentId: ULID.ulid().toString(),
      amount: existingOrder.bill.total,
      transactionState: "credit",
    });

    res.status(200).json({
      success: true,
      message: "Order created successfully",
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  sendStripePublicKeyToClient,
  generateStripeIntent,
  stripePaymentWebhook,
  generateStripeIntentForWallet,
  payOrderWithWallet,
};
