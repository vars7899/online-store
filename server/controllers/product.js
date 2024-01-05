const createHttpError = require("http-errors");
const Product = require("../models/product");
const mongoose = require("mongoose");
const Category = require("../models/category");
const getDataUri = require("../config/dataURI");
const cloudinary = require("cloudinary");
const cloudinaryFunctions = require("../config/cloudinaryFunctions");

async function checkIfValidCategory(categoryId) {
  if (!mongoose.isValidObjectId(categoryId) || !(await Category.findById(categoryId))) {
    throw createHttpError(400, "Invalid or missing category");
  }
}

const checkProductRequiredDetails = (givenDetails) => {
  const { name, desc, length, width, height, weight, price, qty, supplier, featured, category } = givenDetails;

  if (!name || !desc || !supplier || !category) {
    throw createHttpError(400, "Missing one or more required field(s).");
  }
  if (!length || !width || !height || !weight) {
    throw createHttpError(
      400,
      "Missing one or more package details. Please make sure dimension and weight are not zero"
    );
  }
};

async function populateProductWithOtherDetails(productId) {
  const productExist = await Product.findById(productId).populate({ path: "category reviews" });
  await productExist.populate({ path: "category.createdBy", select: "firstName lastName email" });
  await productExist.populate({ path: "reviews.user", select: "firstName lastName email" });

  return productExist;
}

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
    const {
      name,
      desc,
      length,
      width,
      height,
      weight,
      price,
      qty,
      supplier,
      featured,
      category,
      isActive,
      buyingLimit,
    } = req.body;

    // checkProductRequiredDetails(req.body);
    // checkIfValidCategory(category);

    const existingProductDetails = await Product.findById(req.params.productId);

    let setFields = {
      ...(name && { name }),
      ...(desc && { desc }),
      ...((length || height || width) && {
        dimension: {
          ...(length && { length }),
          ...(width && { width }),
          ...(height && { height }),
        },
      }),
      ...(price && { price }),
      ...(qty && { qty }),
      ...(weight && { weight }),
      ...(supplier && { supplier }),
      ...(featured && { featured }),
      ...(category && { category }),
      ...(isActive && { isActive }),
      ...(buyingLimit && { buyingLimit }),
    };


    if (req.file) {
      // Upload New and delete older Image
      const imgObject = await cloudinaryFunctions.uploadFile(req.file);
      setFields = { ...setFields, img: imgObject };
      await cloudinaryFunctions.destroyFile(existingProductDetails.img.publicId);
    }

    console.log(setFields);

    await Product.findByIdAndUpdate(
      req.params.productId,
      {
        $set: setFields,
      },
      { new: true }
    );

    res.status(200).json({
      success: true,
      message: "Product Details updated successfully",
      product: await populateProductWithOtherDetails(req.params.productId),
    });
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
