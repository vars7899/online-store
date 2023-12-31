const calculateOrderBill = (subtotal) => {
  let convenienceFees = Number((subtotal * process.env.BILL_CONVENIENCE_FEE_PERCENT).toFixed(2));
  let pstCharges = Number((subtotal * process.env.BILL_PST_PERCENT).toFixed(2));
  let gstCharges = Number((subtotal * process.env.BILL_GST_PERCENT).toFixed(2));

  return {
    convenienceFees,
    pstCharges,
    gstCharges,
  };
};

module.exports = calculateOrderBill;
