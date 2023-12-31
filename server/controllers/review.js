const createHttpError = require("http-errors");
const checkForValidObjectId = require("../functions/checkForValidObjectId");
const { Review, Product } = require("../models");

const createNewProductReview = async (req, res, next) => {
  try {
    const { productId } = req.params;
    const { comment, rating, wouldRecommend } = req.body;

    checkForValidObjectId(productId, "product");

    if (!comment || !rating || !wouldRecommend) {
      throw createHttpError(400, "Missing one or more required field to create review, Please try again");
    }

    const productExist = await Product.findById(productId);

    if (!productExist) {
      throw createHttpError(404, "Invalid Product, please try again with a valid product");
    }

    const newReview = await Review.create({ comment, rating, user: req.user, wouldRecommend });

    productExist.reviews.push(newReview._id);
    await productExist.save();
    await productExist.populate("reviews");
    productExist.numReviews = productExist.numReviews + 1;
    let ratingSum = 0;
    let totalRating = 0;
    productExist.reviews.forEach((review) => {
      ratingSum += Number(review.rating);
      ++totalRating;
    });
    productExist.averageRating = ratingSum / totalRating;
    await productExist.save();

    res.status(200).json({
      success: true,
      message: "Review added to the product",
    });
  } catch (err) {
    next(err);
  }
};

const deleteUserReview = async (req, res, next) => {
  try {
    const { productId } = req.params;
    const { reviewId } = req.query;

    checkForValidObjectId(reviewId, "review");
    checkForValidObjectId(productId, "product");

    const productExist = await Product.findById(productId);
    await Review.findByIdAndDelete(reviewId);

    productExist.reviews = productExist.reviews.filter((rev) => rev.toString() !== reviewId.toString());

    await productExist.populate("reviews");
    productExist.numReviews = productExist.reviews.length;
    let ratingSum = 0;
    let totalRating = 0;
    productExist.reviews.forEach((review) => {
      ratingSum += Number(review.rating);
      ++totalRating;
    });
    productExist.averageRating = ratingSum / totalRating;
    await productExist.save();

    res.status(200).json({
      success: true,
      message: "Review removed from the product",
    });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  createNewProductReview,
  deleteUserReview,
};
