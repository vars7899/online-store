const mongoose = require("mongoose");

const handleValidObjectId = (req, res, next) => {
  try {
    if (!mongoose.isValidObjectId(productId)) {
      throw createHttpError(404, "Product not found, Invalid product ID");
    }
    next();
  } catch (err) {
    next(err);
  }
};

module.exports = handleValidObjectId;
