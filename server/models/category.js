const mongoose = require("mongoose");

const CategorySchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Category name is a required field"],
      trim: true,
      unique: [true, "Category name should be unique"],
    },
    numberOfProducts: {
      type: Number,
      default: 0,
      required: [true],
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    isFeatured: {
      type: Boolean,
      default: false,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Category = mongoose.model("category", CategorySchema);
module.exports = Category;
