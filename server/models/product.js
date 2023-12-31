const mongoose = require("mongoose");

const ProductSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Product name is a required field"],
      minLength: [5, "Product name must be 5 character long"],
      maxLength: [100, "Product name should be less than 100 character"],
    },
    desc: {
      type: String,
      maxLength: [2000, "Product description should be less than 2000 character"],
    },
    img: {
      publicId: { type: String, default: "v8dfi5ssumh67idamcj8" },
      url: {
        type: String,
        default: "https://res.cloudinary.com/dfcaehp0b/image/upload/v1697088152/v8dfi5ssumh67idamcj8.jpg",
      },
    },
    dimension: {
      length: Number,
      width: Number,
      height: Number,
    },
    weight: {
      type: Number,
      required: [true, "Product weight is a required field"],
    },
    price: {
      type: Number,
      required: [true, "Product price is a required field"],
      default: 0,
    },
    qty: {
      type: Number,
      required: [true, "Product stock quantity is a required field"],
      default: 0,
    },
    supplier: {
      type: String,
      required: [true, "Product supplier name is a required field"],
    },
    featured: {
      type: Boolean,
      default: false,
      required: true,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "category",
      required: [true, "Product category is a required field"],
    },
    reviews: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "review",
      },
    ],
    numReviews: {
      type: Number,
      default: 0,
    },
    averageRating: {
      type: Number,
      default: 0,
    },
    totalSold: {
      type: Number,
      default: 0,
    },
    buyingLimit: {
      type: Number,
      default: 9,
    },
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model("product", ProductSchema);
module.exports = Product;
