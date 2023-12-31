const mongoose = require("mongoose");

const ReviewSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: [true, "Review author is a required field"],
    },
    comment: {
      type: String,
      maxLength: [1000, "Review comment must be less than 1000 character"],
    },
    rating: {
      type: Number,
      default: 0,
      required: [true, "Review rating is a required field"],
    },
    totalLike: {
      type: Number,
      default: 0,
    },
    likedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
    wouldRecommend: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

const Review = mongoose.model("review", ReviewSchema);
module.exports = Review;
