import { createAsyncThunk } from "@reduxjs/toolkit";
import { adminServices } from "../services";

const getErrorResponseMessage = (error) => {
  const message =
    (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
  return message;
};

// >> getAllStoreOrders
export const getAllStoreOrders = createAsyncThunk("dashboard/getAllStoreOrders", async (data, thunkAPI) => {
  try {
    return await adminServices.getAllStoreOrders(data);
  } catch (error) {
    return thunkAPI.rejectWithValue(getErrorResponseMessage(error));
  }
});
// >> getOrderDetails
export const getOrderDetails = createAsyncThunk("dashboard/getOrderDetails", async (data, thunkAPI) => {
  try {
    return await adminServices.getOrderDetails(data);
  } catch (error) {
    return thunkAPI.rejectWithValue(getErrorResponseMessage(error));
  }
});
// >> updateOrderState
export const updateOrderState = createAsyncThunk("dashboard/updateOrderState", async (data, thunkAPI) => {
  try {
    return await adminServices.updateOrderState(data);
  } catch (error) {
    return thunkAPI.rejectWithValue(getErrorResponseMessage(error));
  }
});
// >> getAllStoreUsers
export const getAllStoreUsers = createAsyncThunk("dashboard/getAllStoreUsers", async (data, thunkAPI) => {
  try {
    return await adminServices.getAllUsers(data);
  } catch (error) {
    return thunkAPI.rejectWithValue(getErrorResponseMessage(error));
  }
});
// >> getOrdersStats
export const getOrdersStats = createAsyncThunk("dashboard/getOrdersStats", async (data, thunkAPI) => {
  try {
    return await adminServices.getOrdersStats(data);
  } catch (error) {
    return thunkAPI.rejectWithValue(getErrorResponseMessage(error));
  }
});
