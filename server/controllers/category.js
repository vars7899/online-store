const createHttpError = require("http-errors");
const Category = require("../models/category");
const { default: mongoose } = require("mongoose");
const Product = require("../models/product");

const getAllCategories = async (_, res, next) => {
  try {
    const categoryList = await Category.find({}).populate({
      path: "createdBy",
      select: "email firstName lastName",
    });
    res.status(200).json({
      success: true,
      message: "List of product categories",
      categoryList,
    });
  } catch (err) {
    next(err);
  }
};

const addNewCategory = async (req, res, next) => {
  try {
    const { name } = req.body;
    if (!name || !name.trim()) {
      throw createHttpError(400, "Invalid category name, please provide valid category name");
    }
    if (name.length < 5) {
      throw createHttpError(400, "Category name should have at least 5 character, please try again");
    }
    // Check if the name is already taken
    const categoryExist = await Category.find({ name });
    if (categoryExist.length) {
      throw createHttpError(400, "Category exist already. Category name must be unique, please try again");
    }
    await Category.create({ name, createdBy: req.user._id });

    res.status(200).json({
      success: true,
      message: `${name} category added to the collection`,
      categoryList: await Category.find().populate({
        path: "createdBy",
        select: "email firstName lastName",
      }),
    });
  } catch (err) {
    next(err);
  }
};

const getAllCategoryProducts = async (req, res, next) => {
  try {
    const { categoryId } = req.params;

    if (!mongoose.isValidObjectId(categoryId)) {
      throw createHttpError(404, "Category not found,Invalid Category Id");
    }
    const productList = await Product.find({ category: categoryId });
    res.status(200).json({
      success: true,
      message: "List of products",
      productList,
    });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getAllCategories,
  addNewCategory,
  getAllCategoryProducts,
};
