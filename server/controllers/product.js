const createHttpError = require("http-errors");
const Product = require("../models/product");
const mongoose = require("mongoose");
const Category = require("../models/category");
const getDataUri = require("../config/dataURI");
const cloudinary = require("cloudinary");

const createNewProduct = async (req, res, next) => {
  try {
    const { name, desc, length, width, height, weight, price, qty, supplier, featured, categoryId } = req.body;

    if (!name || !desc || !supplier || !categoryId) {
      throw createHttpError(400, "Missing one or more required field(s).");
    }
    if (!length || !width || !height || !weight) {
      throw createHttpError(
        400,
        "Missing one or more package details. Please make sure dimension and weight are not zero"
      );
    }

    const file = req.file;
    const fileUri = getDataUri(file);

    const myCloud = await cloudinary.v2.uploader.upload(fileUri.content);

    if (!mongoose.isValidObjectId(categoryId) || !(await Category.findById(categoryId))) {
      throw createHttpError(400, "Invalid or missing category");
    }

    const newProduct = await Product.create({
      name,
      desc,
      dimension: {
        length,
        width,
        height,
      },
      price,
      qty,
      weight,
      supplier,
      featured,
      category: categoryId,
      img: {
        publicId: myCloud.public_id,
        url: myCloud.secure_url,
      },
    });
    // Increase number of product in category
    const categoryExist = await Category.findById(categoryId);
    categoryExist.numberOfProducts = categoryExist.numberOfProducts + 1;
    await categoryExist.save();

    if (newProduct) {
      res.status(201).json({
        success: true,
        message: `${name} added to the product list`,
        product: newProduct,
        products: await Product.find({}).populate({
          path: "category",
        }),
      });
    }
  } catch (err) {
    next(err);
  }
};

const getAllProducts = async (req, res, next) => {
  try {
    const productList = await Product.find({}).populate({
      path: "category",
    });

    res.status(200).json({
      success: true,
      message: "List of store products",
      productList,
    });
  } catch (err) {
    next(err);
  }
};

const getALlProductsCategorized = async (req, res, next) => {
  try {
    const productList = await Product.find({}).populate({
      path: "category",
    });
    const categoryList = await Category.find({});

    res.status(200).json({
      success: true,
      message: "List of store products",
      categorizedProductList: productList,
    });
  } catch (err) {
    next(err);
  }
};

const getProductDetails = async (req, res, next) => {
  try {
    const { productId } = req.params;

    if (!mongoose.isValidObjectId(productId)) {
      throw createHttpError(404, "Product not found, Invalid product ID");
    }

    const productExist = await Product.findById(productId).populate({ path: "category reviews" });
    await productExist.populate({ path: "category.createdBy", select: "firstName lastName email" });
    await productExist.populate({ path: "reviews.user", select: "firstName lastName email" });

    res.status(200).json({
      success: true,
      message: `${productExist.name} details`,
      product: productExist,
    });
  } catch (err) {
    next(err);
  }
};

const removeProduct = async (req, res, next) => {
  try {
    const { productId } = req.params;

    if (!mongoose.isValidObjectId(productId)) {
      throw createHttpError(404, "Product not found, Invalid product ID");
    }

    await Product.findByIdAndDelete(productId);

    res.status(200).json({
      success: true,
      message: `Product was removed from records`,
    });
  } catch (err) {
    next(err);
  }
};

const updateProductDetails = async (req, res, next) => {
  try {
  } catch (err) {
    next(err);
  }
};

const updateProductFeatureVisibility = async (req, res, next) => {
  try {
    const { productId } = req.params;

    if (!mongoose.isValidObjectId(productId)) {
      throw createHttpError(404, "Product not found, Invalid product ID");
    }

    const productExist = await Product.findById(productId);
    if (!productExist) {
      throw createHttpError(404, "Product not found, Invalid product ID");
    }
    productExist.featured = !productExist.featured;
    await productExist.save();

    res.status(200).json({
      success: true,
      message: "Product details updated",
      productList: await Product.find({}).populate({ path: "category" }),
    });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  createNewProduct,
  getAllProducts,
  getProductDetails,
  removeProduct,
  updateProductDetails,
  updateProductFeatureVisibility,
  getALlProductsCategorized,
};
