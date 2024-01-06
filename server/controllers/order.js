const createHttpError = require("http-errors");
const checkForValidObjectId = require("../functions/checkForValidObjectId");
const functions = require("../functions");
const ULID = require("ulid");
const Order = require("../models/order");
const { Address, Product } = require("../models");
const { isValidObjectId, default: mongoose } = require("mongoose");

const getOrderCharges = async (req, res, next) => {
  try {
    const { orderItems, shippingServiceType } = req.body;

    if (!orderItems.length) {
      throw createHttpError(400, "Invalid order request, missing order items.");
    }

    // Calculate order item price and other price
    const subtotal = functions.calculateOrderItemSubtotal(orderItems);
    const { convenienceFees, pstCharges, gstCharges } = functions.calculateOrderBill(subtotal);
    const shippingCharges = functions.calculateShippingPrice(shippingServiceType);
    const total = subtotal + convenienceFees + pstCharges + gstCharges + shippingCharges;

    res.status(200).json({
      success: true,
      message: "order items charges details",
      charges: {
        subtotal,
        convenienceFees,
        pst: pstCharges,
        gst: gstCharges,
        total,
        shippingCharges,
      },
    });
  } catch (err) {
    next(err);
  }
};
const createNewOrder = async (req, res, next) => {
  try {
    const {
      shippingAddressId,
      billingAddressId,
      shippingMethod,
      shippingServiceType,
      estimatedDeliveryDate,
      orderItems,
      paymentMethod,
      paymentIntent,
    } = req.body;

    if (!shippingAddressId || !billingAddressId || !shippingMethod || !shippingServiceType || !estimatedDeliveryDate) {
      throw createHttpError(400, "Missing one or more required field(s).");
    }
    if (!orderItems.length) {
      throw createHttpError(400, "Invalid order request, missing order items.");
    }
    checkForValidObjectId(shippingAddressId, "Shipping address");
    checkForValidObjectId(billingAddressId, "Billing address");

    // Calculate order item price and other price
    const bill = functions.getChargesForOrder(orderItems, shippingServiceType);

    // Save shipping address
    const shippingAddress = await Address.findById(shippingAddressId);
    const billingAddress = await Address.findById(billingAddressId);

    // >> Check if th stock is available for each product
    for (const item of orderItems) {
      const productExist = await Product.findById(item.product._id);
      if (productExist.qty < item.qty) {
        throw createHttpError(400, "It seems we are out of stock for some products. Please try again.");
      }
      productExist.totalSold += item.qty;
      productExist.qty -= item.qty;
      await productExist.save();
    }

    const newOrder = await Order.create({
      user: req.user._id,
      orderItems,
      shippingAddress,
      billingAddress,
      lastUpdate: Date.now(),
      bill: {
        subtotal: bill.subtotal,
        convenienceFees: bill.convenienceFees,
        pst: bill.pst,
        gst: bill.gst,
        total: bill.total,
        shippingCharges: bill.shippingCharges,
      },
      shippingMethod,
      shippingServiceType,
      trackingNumber: ULID.ulid().toString(),
      estimatedDeliveryDate,
      paymentMethod,
      paymentIntent,
    });

    res.status(200).json({
      success: true,
      message: "Order was placed",
      order: newOrder,
    });
  } catch (err) {
    next(err);
  }
};

const getAllUserOrders = async (req, res, next) => {
  try {
    console.log(req.query);
    const { withOrderState, withShippingMethod, withShippingServiceType, withPaymentMethod, withOrderDuration } =
      req.query;
    // << Base condition to get user orders
    const queryConditions = { user: req.user._id };
    // << Other conditions if provided
    if (withOrderState) queryConditions.orderState = withOrderState;
    if (withShippingMethod) queryConditions.shippingMethod = withShippingMethod;
    if (withShippingServiceType) queryConditions.shippingServiceType = withShippingServiceType;
    if (withPaymentMethod) queryConditions.paymentMethod = withPaymentMethod;
    if (withOrderDuration) queryConditions.createdAt = { $gt: withOrderDuration };

    let userOrderList = await Order.find(queryConditions).populate("orderItems.product");

    res.status(200).json({
      success: true,
      message: "List of user order",
      orderList: userOrderList,
      numberOfOrders: userOrderList ? userOrderList.length : 0,
    });
  } catch (err) {
    next(err);
  }
};

const getOrderChargesInformation = (_, res, next) => {
  try {
    res.status(200).json({
      success: true,
      message: "List of store order charges",
      percentage: {
        convenienceFeesPercentage: process.env.BILL_CONVENIENCE_FEE_PERCENT,
        pstPercentage: process.env.BILL_PST_PERCENT,
        gstPercentage: process.env.BILL_GST_PERCENT,
      },
    });
  } catch (error) {
    next(error);
  }
};
const updateOrderPaymentDetails = async (req, res, next) => {
  try {
    const { orderId } = req.params;
    const { paymentDate, paymentStatus, paymentAmount, paymentId } = req.body;
    if (paymentStatus !== "succeeded") {
      throw createHttpError(
        400,
        "It seems your payment failed, if not please contact support, we will get it sorted for you."
      );
    }

    checkForValidObjectId(orderId, "order");

    const updatedOrder = await Order.findOneAndUpdate(
      { _id: orderId, user: req.user },
      {
        $set: {
          orderState: "Paid",
          "paymentDetails.paymentDate": paymentDate,
          "paymentDetails.paymentStatus": paymentStatus,
          "paymentDetails.paymentAmount": paymentAmount,
          "paymentDetails.paymentId": paymentId,
        },
      },
      { new: true }
    );

    if (!updatedOrder) {
      // Handle the case where the order with the provided ID was not found
      throw createHttpError(404, "Order not found");
    }

    // Send the updated order as a response
    res.status(200).json({
      success: true,
      message: "Order was updated",
      order: updatedOrder,
    });
  } catch (err) {
    next(err);
  }
};

const getAllStoreOrders = async (req, res, next) => {
  try {
    const storeOrders = await Order.find({}).sort({ createdAt: -1 }).populate({
      path: "user",
      select: "firstName lastName",
    });

    res.status(200).json({
      success: true,
      message: "ADMIN - Store order list",
      orderList: storeOrders,
      orderCount: storeOrders ? storeOrders.length : 0,
    });
  } catch (err) {
    next(err);
  }
};

const getCompleteOrderDetails = async (req, res, next) => {
  try {
    const { orderId } = req.params;

    checkForValidObjectId(orderId, "order");

    const orderDetails = await Order.findById(orderId)
      .populate({
        path: "user",
        select: "firstName lastName email phone",
      })
      .populate({
        path: "orderItems.product",
      });

    res.status(200).json({
      success: true,
      message: "ADMIN - order details",
      order: orderDetails,
    });
  } catch (err) {
    next(err);
  }
};

const updateOrderState = async (req, res, next) => {
  try {
    const { orderId } = req.params;
    const { updateStateTo } = req.body;

    console.log(req.body);

    isValidObjectId(orderId, "order");

    const updatedOrderDetails = await Order.findOneAndUpdate(
      { _id: orderId },
      {
        $set: { orderState: updateStateTo },
      },
      { new: true }
    )
      .populate({
        path: "user",
        select: "firstName lastName email phone",
      })
      .populate({
        path: "orderItems.product",
      });

    res.status(200).json({
      success: true,
      message: "Order state/status updated",
      order: updatedOrderDetails,
    });
  } catch (err) {
    next(err);
  }
};

const getAllOrdersWithGivenProduct = async (req, res, next) => {
  try {
    const { productId } = req.params;

    if (!productId || !mongoose.isValidObjectId(productId)) {
      throw createHttpError(404, "Unknown product, No such product exist. Please try again with a different product");
    }

    const orderList = await Order.find({ orderItems: { $elemMatch: { product: productId } } });

    res.status(200).json({
      success: true,
      message: "List of orders",
      orderList,
    });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  createNewOrder,
  getAllUserOrders,
  getOrderCharges,
  getOrderChargesInformation,
  updateOrderPaymentDetails,
  getAllStoreOrders,
  getCompleteOrderDetails,
  updateOrderState,
  getAllOrdersWithGivenProduct,
};
