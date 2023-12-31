const { User } = require("../models");
const Order = require("../models/order");

const getAllUserDetails = async (req, res, next) => {
  try {
    // _id: { $ne: req.user._id }
    const userList = await User.find({}).sort({ createdAt: -1 }).select("-password -otp");

    res.status(200).json({
      success: true,
      message: "ADMIN --> List of store users",
      userList,
    });
  } catch (err) {
    next(err);
  }
};

const getUserOrderPreferences = async (req, res, next) => {
  try {
    const allOrders = await Order.find({});

    const paymentMethodStat = ["credit card", "wallet", "cash on delivery"].map((method) => ({
      method,
      amount: allOrders.filter((o) => o.paymentMethod === method).length,
    }));
    res.status(200).json({
      success: true,
      message: "ADMIN --> User order preferences demographics",
      paymentMethodStat,
    });
  } catch (err) {
    next(err);
  }
};
module.exports = {
  getAllUserDetails,
  getUserOrderPreferences,
};
