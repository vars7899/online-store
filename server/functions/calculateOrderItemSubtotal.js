const calculateOrderItemSubtotal = (orderItems) => {
  let subtotal = orderItems.reduce((total, item) => {
    const totalItemPrice = item.product.price * item.qty;
    return total + totalItemPrice;
  }, 0);
  return subtotal;
};

module.exports = calculateOrderItemSubtotal;
