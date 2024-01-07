import { createAsyncThunk } from "@reduxjs/toolkit";
import { adminServices, orderServices, productServices, categoryServices } from "../services";
import { thunkRejectWithMessage } from "../thunkRejectWithMessage";

// >> getAllStoreOrders
export const getAllStoreOrders = createAsyncThunk("DASHBOARD/getAllStoreOrders", async (data, thunkAPI) => {
  try {
    return await adminServices.getAllStoreOrders(data);
  } catch (error) {
    thunkRejectWithMessage(error, thunkAPI);
  }
});
// >> getOrderDetails
export const getOrderDetails = createAsyncThunk("DASHBOARD/getOrderDetails", async (data, thunkAPI) => {
  try {
    return await adminServices.getOrderDetails(data);
  } catch (error) {
    thunkRejectWithMessage(error, thunkAPI);
  }
});
// >> updateOrderState
export const updateOrderState = createAsyncThunk("DASHBOARD/updateOrderState", async (data, thunkAPI) => {
  try {
    return await adminServices.updateOrderState(data);
  } catch (error) {
    thunkRejectWithMessage(error, thunkAPI);
  }
});
// >> getAllStoreUsers
export const getAllStoreUsers = createAsyncThunk("DASHBOARD/getAllStoreUsers", async (data, thunkAPI) => {
  try {
    return await adminServices.getAllUsers(data);
  } catch (error) {
    thunkRejectWithMessage(error, thunkAPI);
  }
});
// >> getOrdersStats
export const getOrdersStats = createAsyncThunk("DASHBOARD/getOrdersStats", async (data, thunkAPI) => {
  try {
    return await adminServices.getOrdersStats(data);
  } catch (error) {
    thunkRejectWithMessage(error, thunkAPI);
  }
});

// >> updateProductDetails
export const updateProductDetails = createAsyncThunk("DASHBOARD/updateProductDetails", async (data, thunkAPI) => {
  try {
    return await productServices.updateProductDetails(data);
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