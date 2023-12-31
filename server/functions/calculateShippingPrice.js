const calculateShippingPrice = (givenShippingType) => {
  switch (givenShippingType) {
    case "express":
      return 4.99;
    case "standard":
      return 2.99;
    case "free":
      return 0.0;
  }
};

module.exports = calculateShippingPrice;
