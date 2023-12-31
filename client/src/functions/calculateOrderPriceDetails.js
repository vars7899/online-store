const calculateOrderPriceDetails = (subtotal) => {
  let pstPercent = 0.04;
  let gstPercent = 0.06;
  let conveniencePercent = 0.0015;
  let convenienceFee = Number((subtotal * conveniencePercent).toFixed(2));
  let pstCharges = Number((subtotal * pstPercent).toFixed(2));
  let gstCharges = Number((subtotal * gstPercent).toFixed(2));
  let total = Number((5.99 + convenienceFee + pstCharges + gstCharges + subtotal).toFixed(2));

  return {
    shippingCharges: 5.99,
    convenienceFee,
    pstCharges,
    gstCharges,
    total,
  };
};

export default calculateOrderPriceDetails;
