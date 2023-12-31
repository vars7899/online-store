const validateEmail = require("./validateEmail");
const generateOtp = require("./generateOtp");
const sendEmail = require("./sendEmail");
const sendToken = require("./sendToken");
const calculateOrderBill = require("./calculateOrderBill");
const calculateOrderItemSubtotal = require("./calculateOrderItemSubtotal");
const calculateShippingPrice = require("./calculateShippingPrice");
const getChargesForOrder = require("./getChargesForOrder");

module.exports = {
  validateEmail,
  generateOtp,
  sendEmail,
  sendToken,
  calculateOrderBill,
  calculateOrderItemSubtotal,
  calculateShippingPrice,
  getChargesForOrder,
};
