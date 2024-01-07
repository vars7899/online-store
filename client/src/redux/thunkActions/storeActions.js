import { createAsyncThunk } from "@reduxjs/toolkit";
import { productServices, orderServices, categoryServices, userServices, addressServices } from "../services";
import { thunkRejectWithMessage } from "../thunkRejectWithMessage";

// << GET_ALL_STORE_PRODUCTS
export const GET_ALL_STORE_PRODUCTS = createAsyncThunk("STORE/GET_ALL_STORE_PRODUCTS", async (thunkAPI) => {
  try {
    return await productServices.GET_ALL_PRODUCTS();
  } catch (error) {
    thunkRejectWithMessage(error, thunkAPI);
  }
});

// << GET_ALL_STORE_PRODUCT_CATEGORIES
export const GET_ALL_STORE_PRODUCT_CATEGORIES = createAsyncThunk(
  "STORE/GET_ALL_STORE_PRODUCT_CATEGORIES",
  async (thunkAPI) => {
    try {
      return await categoryServices.GET_ALL_PRODUCT_CATEGORIES();
    } catch (error) {
      thunkRejectWithMessage(error, thunkAPI);
    }
  }
);
// << GET_PRODUCT_DETAILS
export const GET_STORE_PRODUCT_DETAILS = createAsyncThunk("STORE/GET_PRODUCT_DETAILS", async (data, thunkAPI) => {
  try {
    return await productServices.GET_PRODUCT_DETAILS(data);
  } catch (error) {
    thunkRejectWithMessage(error, thunkAPI);
  }
});

// << REMOVE_PRODUCT_FROM_USER_CART
export const REMOVE_PRODUCT_FROM_USER_CART = createAsyncThunk(
  "STORE/REMOVE_PRODUCT_FROM_USER_CART",
  async (data, thunkAPI) => {
    try {
      return await userServices.REMOVE_PRODUCT_FROM_USER_CART(data);
    } catch (error) {
      thunkRejectWithMessage(error, thunkAPI);
    }
  }
);
// << ADD_PRODUCT_TO_USER_CART
export const ADD_PRODUCT_TO_USER_CART = createAsyncThunk("STORE/ADD_PRODUCT_TO_USER_CART", async (data, thunkAPI) => {
  try {
    return await userServices.ADD_PRODUCT_TO_USER_CART(data);
  } catch (error) {
    thunkRejectWithMessage(error, thunkAPI);
  }
});

// << UPDATE_CART_ITEM_QTY
export const UPDATE_CART_ITEM_QTY = createAsyncThunk("STORE/updateCartItemQty", async (data, thunkAPI) => {
  try {
    return await userServices.updateCartItemQty(data);
  } catch (error) {
    thunkRejectWithMessage(error, thunkAPI);
  }
});

// << REMOVE_PRODUCT_FROM_USER_WISHLIST
export const REMOVE_PRODUCT_FROM_USER_WISHLIST = createAsyncThunk(
  "STORE/REMOVE_PRODUCT_FROM_USER_WISHLIST",
  async (data, thunkAPI) => {
    try {
      return await userServices.REMOVE_PRODUCT_FROM_USER_WISHLIST(data);
    } catch (error) {
      thunkRejectWithMessage(error, thunkAPI);
    }
  }
);

// << ADD_PRODUCT_TO_USER_WISHLIST
export const ADD_PRODUCT_TO_USER_WISHLIST = createAsyncThunk(
  "STORE/ADD_PRODUCT_TO_USER_WISHLIST",
  async (data, thunkAPI) => {
    try {
      return await userServices.ADD_PRODUCT_TO_USER_WISHLIST(data);
    } catch (error) {
      thunkRejectWithMessage(error, thunkAPI);
    }
  }
);

// << GET_USER_CART_DETAILS
export const GET_USER_CART_DETAILS = createAsyncThunk("STORE/GET_USER_CART_DETAILS", async (thunkAPI) => {
  try {
    return await userServices.GET_USER_CART_DETAILS();
  } catch (error) {
    thunkRejectWithMessage(error, thunkAPI);
  }
});

// << GET_USER_WISHLIST_DETAILS
export const GET_USER_WISHLIST_DETAILS = createAsyncThunk("STORE/GET_USER_WISHLIST_DETAILS", async (thunkAPI) => {
  try {
    return await userServices.GET_USER_WISHLIST_DETAILS();
  } catch (error) {
    thunkRejectWithMessage(error, thunkAPI);
  }
});

// << GET_ALL_SHIPPING_ADDRESS
export const GET_ALL_SHIPPING_ADDRESS = createAsyncThunk("STORE/GET_ALL_SHIPPING_ADDRESS", async (thunkAPI) => {
  try {
    return await addressServices.GET_ALL_SHIPPING_ADDRESS();
  } catch (error) {
    thunkRejectWithMessage(error, thunkAPI);
  }
});

// << CREATE_NEW_SHIPPING_ADDRESS
export const CREATE_NEW_SHIPPING_ADDRESS = createAsyncThunk(
  "STORE/CREATE_NEW_SHIPPING_ADDRESS",
  async (data, thunkAPI) => {
    try {
      return await addressServices.CREATE_NEW_SHIPPING_ADDRESS(data);
    } catch (error) {
      thunkRejectWithMessage(error, thunkAPI);
    }
  }
);

// << UPDATE_DEFAULT_SHIPPING_ADDRESS
export const UPDATE_DEFAULT_SHIPPING_ADDRESS = createAsyncThunk(
  "STORE/UPDATE_DEFAULT_SHIPPING_ADDRESS",
  async (data, thunkAPI) => {
    try {
      return await addressServices.UPDATE_DEFAULT_SHIPPING_ADDRESS(data);
    } catch (error) {
      thunkRejectWithMessage(error, thunkAPI);
    }
  }
);

// << DELETE_SHIPPING_ADDRESS
export const DELETE_SHIPPING_ADDRESS = createAsyncThunk("STORE/DELETE_SHIPPING_ADDRESS", async (data, thunkAPI) => {
  try {
    return await addressServices.DELETE_SHIPPING_ADDRESS(data);
  } catch (error) {
    thunkRejectWithMessage(error, thunkAPI);
  }
});

// << UPDATE_SHIPPING_ADDRESS
export const UPDATE_SHIPPING_ADDRESS = createAsyncThunk("STORE/UPDATE_SHIPPING_ADDRESS", async (data, thunkAPI) => {
  try {
    return await addressServices.UPDATE_SHIPPING_ADDRESS(data);
  } catch (error) {
    thunkRejectWithMessage(error, thunkAPI);
  }
});

// << GET_STORE_CHARGES_PERCENTAGE
export const GET_STORE_CHARGES_PERCENTAGE = createAsyncThunk("STORE/GET_STORE_CHARGES_PERCENTAGE", async (thunkAPI) => {
  try {
    return await orderServices.GET_STORE_CHARGES_PERCENTAGE();
  } catch (error) {
    thunkRejectWithMessage(error, thunkAPI);
  }
});

// << CLEAR_USER_CART
export const CLEAR_USER_CART = createAsyncThunk("STORE/CLEAR_USER_CART", async (thunkAPI) => {
  try {
    return await userServices.CLEAR_USER_CART();
  } catch (error) {
    thunkRejectWithMessage(error, thunkAPI);
  }
});

// << CREATE_PRODUCT_REVIEW
export const CREATE_PRODUCT_REVIEW = createAsyncThunk("STORE/CREATE_PRODUCT_REVIEW", async (data, thunkAPI) => {
  try {
    return await productServices.CREATE_PRODUCT_REVIEW(data);
  } catch (error) {
    thunkRejectWithMessage(error, thunkAPI);
  }
});
