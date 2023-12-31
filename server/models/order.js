const mongoose = require("mongoose");

const OrderSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: [true, "User key is required to create order"],
    },
    orderItems: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "product",
          required: [true, "Product key is required to add orderItem"],
        },
        qty: {
          type: Number,
          required: [true, "Product quantity is required to add orderItem"],
        },
      },
    ],
    // In Case the user delete the connected address
    shippingAddress: {
      street: { type: String, required: true },
      addressLine: { type: String },
      city: { type: String, required: true },
      state: { type: String, required: true },
      country: { type: String, required: true },
      postalCode: { type: String, required: true },
      name: { type: String },
      contactInformation: { type: String },
      deliveryInstruction: { type: String },
    },
    // In Case the user delete the connected address
    billingAddress: {
      street: { type: String, required: true },
      addressLine: { type: String },
      city: { type: String, required: true },
      state: { type: String, required: true },
      country: { type: String, required: true },
      postalCode: { type: String, required: true },
      name: { type: String },
      contactInformation: { type: String },
      deliveryInstruction: { type: String },
    },
    orderState: {
      type: String,
      enum: [
        "Pending/Unpaid",
        "Paid",
        "Processing",
        "Shipped",
        "Out for Delivery",
        "Delivered",
        "Completed",
        "Canceled",
        "On Hold",
      ],
      default: "Pending/Unpaid",
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    lastUpdate: {
      type: Date,
    },
    bill: {
      subtotal: { type: Number, required: true },
      total: { type: Number, required: true },
      shippingCharges: { type: Number, required: true, default: 0 },
      pst: { type: Number, required: true, default: 0 },
      gst: { type: Number, required: true, default: 0 },
      convenienceFees: { type: Number, required: true, default: 0 },
      discountAmount: { type: Number, required: true, default: 0 },
    },
    shippingMethod: {
      type: String,
      enum: ["delivery", "pickup"],
      default: "delivery",
    },
    shippingServiceType: {
      type: String,
      enum: ["express", "standard", "free"],
      default: "free",
    },
    trackingNumber: { type: String, unique: true },
    estimatedDeliveryDate: { type: Date },
    return: {
      requested: { type: Boolean, default: false },
      reason: { type: String, maxLength: [2000, "Max length of return reason must be under 2000 characters"] },
    },
    paymentMethod: {
      type: String,
      enum: ["cash on delivery", "credit card", "wallet"],
      required: [true, "payment method key is required to create order"],
    },
    paymentIntent: { type: String },
    paymentDetails: {
      paymentDate: { type: Date },
      paymentStatus: { type: String },
      paymentAmount: { type: Number },
      paymentId: { type: String },
      receiptUrl: { type: String },
    },
    isUrgent: { type: Boolean, default: false, required: true },
  },
  {
    timestamps: true,
  }
);

const Order = mongoose.model("order", OrderSchema);
module.exports = Order;
