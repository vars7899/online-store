import { createAsyncThunk } from "@reduxjs/toolkit";
import { adminServices, orderServices, productServices, categoryServices } from "../services";
import { thunkRejectWithMessage } from "../thunkRejectWithMessage";

// << GET_ALL_STORE_ORDERS
export const GET_ALL_STORE_ORDERS = createAsyncThunk("DASHBOARD/GET_ALL_STORE_ORDERS", async (data, thunkAPI) => {
  try {
    return await adminServices.GET_ALL_STORE_ORDERS(data);
  } catch (error) {
    thunkRejectWithMessage(error, thunkAPI);
  }
});
// << GET_ORDER_DETAILS
export const GET_ORDER_DETAILS = createAsyncThunk("DASHBOARD/GET_ORDER_DETAILS", async (data, thunkAPI) => {
  try {
    return await adminServices.GET_ORDER_DETAILS(data);
  } catch (error) {
    thunkRejectWithMessage(error, thunkAPI);
  }
});
// << UPDATE_ORDER_STATE
export const UPDATE_ORDER_STATE = createAsyncThunk("DASHBOARD/UPDATE_ORDER_STATE", async (data, thunkAPI) => {
  try {
    return await adminServices.UPDATE_ORDER_STATE(data);
  } catch (error) {
    thunkRejectWithMessage(error, thunkAPI);
  }
});
// << GET_ALL_STORE_USERS
export const GET_ALL_STORE_USERS = createAsyncThunk("DASHBOARD/GET_ALL_STORE_USERS", async (data, thunkAPI) => {
  try {
    return await adminServices.GET_ALL_STORE_USERS(data);
  } catch (error) {
    thunkRejectWithMessage(error, thunkAPI);
  }
});
// << GET_USER_PAYMENT_PREFERENCE
export const GET_USER_PAYMENT_PREFERENCE = createAsyncThunk("DASHBOARD/GET_USER_PAYMENT_PREFERENCE", async (data, thunkAPI) => {
  try {
    return await adminServices.GET_USER_PAYMENT_PREFERENCE(data);
  } catch (error) {
    thunkRejectWithMessage(error, thunkAPI);
  }
});

// << UPDATE_PRODUCT_DETAILS
export const UPDATE_PRODUCT_DETAILS = createAsyncThunk("DASHBOARD/UPDATE_PRODUCT_DETAILS", async (data, thunkAPI) => {
  try {
    return await productServices.UPDATE_PRODUCT_DETAILS(data);
  } catch (error) {
    thunkRejectWithMessage(error, thunkAPI);
  }
});

// << GET_ALL_ORDERS_ASSOCIATED_WITH_PRODUCT
export const GET_ALL_ORDERS_ASSOCIATED_WITH_PRODUCT = createAsyncThunk(
  "DASHBOARD/GET_ALL_ORDERS_ASSOCIATED_WITH_PRODUCT",
  async (data, thunkAPI) => {
    try {
      return await orderServices.GET_ALL_ORDERS_ASSOCIATED_WITH_PRODUCT(data);
    } catch (error) {
      thunkRejectWithMessage(error, thunkAPI);
    }
  }
);

// << CREATE_NEW_PRODUCT_CATEGORY
export const CREATE_NEW_PRODUCT_CATEGORY = createAsyncThunk(
  "DASHBOARD/CREATE_NEW_PRODUCT_CATEGORY",
  async (data, thunkAPI) => {
    try {
      return await categoryServices.CREATE_NEW_PRODUCT_CATEGORY(data);
    } catch (error) {
      thunkRejectWithMessage(error, thunkAPI);
    }
  }
);

// << GET_ALL_PRODUCT_CATEGORIES
export const GET_ALL_PRODUCT_CATEGORIES = createAsyncThunk("DASHBOARD/GET_ALL_PRODUCT_CATEGORIES", async (thunkAPI) => {
  try {
    return await categoryServices.GET_ALL_PRODUCT_CATEGORIES();
  } catch (error) {
    thunkRejectWithMessage(error, thunkAPI);
  }
});

// << GET_ALL_PRODUCT_ASSOCIATED_WITH_CATEGORY
export const GET_ALL_PRODUCT_ASSOCIATED_WITH_CATEGORY = createAsyncThunk(
  "DASHBOARD/GET_ALL_PRODUCT_ASSOCIATED_WITH_CATEGORY",
  async (data, thunkAPI) => {
    try {
      return await categoryServices.GET_ALL_PRODUCT_ASSOCIATED_WITH_CATEGORY(data);
    } catch (error) {
      thunkRejectWithMessage(error, thunkAPI);
    }
  }
);

// << GET_ALL_PRODUCTS
export const GET_ALL_PRODUCTS = createAsyncThunk("DASHBOARD/GET_ALL_PRODUCTS", async (thunkAPI) => {
  try {
    return await productServices.GET_ALL_PRODUCTS();
  } catch (error) {
    thunkRejectWithMessage(error, thunkAPI);
  }
});

// << UPDATE_PRODUCT_FEATURE_VISIBILITY
export const UPDATE_PRODUCT_FEATURE_VISIBILITY = createAsyncThunk(
  "DASHBOARD/UPDATE_PRODUCT_FEATURE_VISIBILITY",
  async (data, thunkAPI) => {
    try {
      return await productServices.UPDATE_PRODUCT_FEATURE_VISIBILITY(data);
    } catch (error) {
      thunkRejectWithMessage(error, thunkAPI);
    }
  }
);

// << GET_PRODUCT_DETAILS
export const GET_PRODUCT_DETAILS = createAsyncThunk("DASHBOARD/GET_PRODUCT_DETAILS", async (data, thunkAPI) => {
  try {
    return await productServices.GET_PRODUCT_DETAILS(data);
  } catch (error) {
    thunkRejectWithMessage(error, thunkAPI);
  }
});

// << CREATE_NEW_PRODUCT
export const CREATE_NEW_PRODUCT = createAsyncThunk("DASHBOARD/CREATE_NEW_PRODUCT", async (data, thunkAPI) => {
  try {
    return await productServices.CREATE_NEW_PRODUCT(data);
  } catch (error) {
    thunkRejectWithMessage(error, thunkAPI);
  }
});