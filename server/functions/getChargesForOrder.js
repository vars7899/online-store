const createHttpError = require("http-errors");
const calculateOrderItemSubtotal = require("./calculateOrderItemSubtotal");
const calculateOrderBill = require("./calculateOrderBill");
const calculateShippingPrice = require("./calculateShippingPrice");

const getChargesForOrder = (orderItems, shippingServiceType) => {
  if (!orderItems.length) {
    throw createHttpError(400, "Invalid order request, missing order items.");
  }

  console.log(orderItems);

  const subtotal = calculateOrderItemSubtotal(orderItems);
  const { convenienceFees, pstCharges, gstCharges } = calculateOrderBill(subtotal);
  const shippingCharges = calculateShippingPrice(shippingServiceType);
  const total = subtotal + convenienceFees + pstCharges + gstCharges + shippingCharges;

  return {
    subtotal,
    convenienceFees,
    pst: pstCharges,
    gst: gstCharges,
    total,
    shippingCharges,
  };
};

module.exports = getChargesForOrder;
