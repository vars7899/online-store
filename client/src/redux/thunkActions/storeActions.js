import { createAsyncThunk } from "@reduxjs/toolkit";
import * as productService from "../services/product";
import * as categoryService from "../services/category";
import * as userService from "../services/user";
import * as addressService from "../services/address";
import { orderServices } from "../services";
import { thunkRejectMessage } from "../thunkRejectWithMessage";

// GET_ALL_STORE_PRODUCTS
export const GET_ALL_STORE_PRODUCTS = createAsyncThunk("store/getAllStoreProducts", async (thunkAPI) => {
  try {
    return await productService.getAllProducts();
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) || error.message || error.toString();

    return thunkAPI.rejectWithValue(message);
  }
});
// GET_ALL_STORE_PRODUCT_CATEGORIES
export const GET_ALL_STORE_PRODUCT_CATEGORIES = createAsyncThunk(
  "store/getAllStoreProductCategories",
  async (thunkAPI) => {
    try {
      return await categoryService.getAllProductCategories();
    } catch (error) {
      const message =
        (error.response && error.response.data && error.response.data.message) || error.message || error.toString();

      return thunkAPI.rejectWithValue(message);
    }
  }
);
// GET_PRODUCT_DETAILS
export const GET_STORE_PRODUCT_DETAILS = createAsyncThunk("store/getStoreProductDetails", async (data, thunkAPI) => {
  try {
    return await productService.getProductDetails(data);
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) || error.message || error.toString();

    return thunkAPI.rejectWithValue(message);
  }
});
// REMOVE_PRODUCT_FROM_USER_CART
export const REMOVE_PRODUCT_FROM_USER_CART = createAsyncThunk(
  "store/removeProductFromUserCart",
  async (data, thunkAPI) => {
    try {
      return await userService.removeProductFromUserCart(data);
    } catch (error) {
      const message =
        (error.response && error.response.data && error.response.data.message) || error.message || error.toString();

      return thunkAPI.rejectWithValue(message);
    }
  }
);
// ADD_PRODUCT_TO_USER_CART
export const ADD_PRODUCT_TO_USER_CART = createAsyncThunk("store/addProductToUserCart", async (data, thunkAPI) => {
  try {
    return await userService.addProductToUserCart(data);
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) || error.message || error.toString();

    return thunkAPI.rejectWithValue(message);
  }
});
// UPDATE_CART_ITEM_QTY
export const UPDATE_CART_ITEM_QTY = createAsyncThunk("store/updateCartItemQty", async (data, thunkAPI) => {
  try {
    return await userService.updateCartItemQty(data);
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) || error.message || error.toString();

    return thunkAPI.rejectWithValue(message);
  }
});
// REMOVE_PRODUCT_FROM_USER_WISHLIST
export const REMOVE_PRODUCT_FROM_USER_WISHLIST = createAsyncThunk(
  "store/removeProductFromUserWishlist",
  async (data, thunkAPI) => {
    try {
      return await userService.removeProductFromUserWishlist(data);
    } catch (error) {
      const message =
        (error.response && error.response.data && error.response.data.message) || error.message || error.toString();

      return thunkAPI.rejectWithValue(message);
    }
  }
);
// ADD_PRODUCT_TO_USER_WISHLIST
export const ADD_PRODUCT_TO_USER_WISHLIST = createAsyncThunk(
  "store/addProductToUserWishlist",
  async (data, thunkAPI) => {
    try {
      return await userService.addProductToUserWishlist(data);
    } catch (error) {
      const message =
        (error.response && error.response.data && error.response.data.message) || error.message || error.toString();

      return thunkAPI.rejectWithValue(message);
    }
  }
);
// GET_USER_CART_DETAILS
export const GET_USER_CART_DETAILS = createAsyncThunk("store/getUserCartDetails", async (thunkAPI) => {
  try {
    return await userService.getUserCartDetails();
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) || error.message || error.toString();

    return thunkAPI.rejectWithValue(message);
  }
});
// GET_USER_WISHLIST_DETAILS
export const GET_USER_WISHLIST_DETAILS = createAsyncThunk("store/getUserWishlistDetails", async (thunkAPI) => {
  try {
    return await userService.getUserWishlistDetails();
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) || error.message || error.toString();

    return thunkAPI.rejectWithValue(message);
  }
});
// GET_ALL_SHIPPING_ADDRESS
export const GET_ALL_SHIPPING_ADDRESS = createAsyncThunk("store/getAllShippingAddress", async (thunkAPI) => {
  try {
    return await addressService.getAllShippingAddress();
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) || error.message || error.toString();

    return thunkAPI.rejectWithValue(message);
  }
});
// CREATE_NEW_SHIPPING_ADDRESS
export const CREATE_NEW_SHIPPING_ADDRESS = createAsyncThunk(
  "store/createNewShippingAddress",
  async (data, thunkAPI) => {
    try {
      return await addressService.createNewShippingAddress(data);
    } catch (error) {
      const message =
        (error.response && error.response.data && error.response.data.message) || error.message || error.toString();

      return thunkAPI.rejectWithValue(message);
    }
  }
);
// UPDATE_DEFAULT_SHIPPING_ADDRESS
export const UPDATE_DEFAULT_SHIPPING_ADDRESS = createAsyncThunk(
  "store/updateDefaultShippingAddress",
  async (data, thunkAPI) => {
    try {
      return await addressService.updateDefaultShippingAddress(data);
    } catch (error) {
      const message =
        (error.response && error.response.data && error.response.data.message) || error.message || error.toString();

      return thunkAPI.rejectWithValue(message);
    }
  }
);
// DELETE_SHIPPING_ADDRESS
export const DELETE_SHIPPING_ADDRESS = createAsyncThunk("store/deleteShippingAddress", async (data, thunkAPI) => {
  try {
    return await addressService.deleteShippingAddress(data);
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) || error.message || error.toString();

    return thunkAPI.rejectWithValue(message);
  }
});
// UPDATE_SHIPPING_ADDRESS
export const UPDATE_SHIPPING_ADDRESS = createAsyncThunk("store/updateShippingAddress", async (data, thunkAPI) => {
  try {
    return await addressService.updateShippingAddressDetails(data);
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) || error.message || error.toString();

    return thunkAPI.rejectWithValue(message);
  }
});
// >> getStoreChargesPercentage
export const getStoreChargesPercentage = createAsyncThunk("store/getStoreChargesPercentage", async (thunkAPI) => {
  try {
    return await orderServices.getStoreChargesPercentage();
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) || error.message || error.toString();

    return thunkAPI.rejectWithValue(message);
  }
});
// >> clearUserCart
export const clearUserCart = createAsyncThunk("store/clearUserCart", async (thunkAPI) => {
  try {
    return await userService.clearUserCart();
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) || error.message || error.toString();

    return thunkAPI.rejectWithValue(message);
  }
});

// >> createProductReview
export const createProductReview = createAsyncThunk("store/createProductReview", async (data, thunkAPI) => {
  try {
    return await productService.createProductReview(data);
  } catch (error) {
    // thunkRejectMessage(error, thunkAPI);
    const message =
      (error.response && error.response.data && error.response.data.message) || error.message || error.toString();

    return thunkAPI.rejectWithValue(message);
  }
});
