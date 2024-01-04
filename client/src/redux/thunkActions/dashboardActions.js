import { createAsyncThunk } from "@reduxjs/toolkit";
import { adminServices } from "../services";
import { thunkRejectWithMessage } from "../thunkRejectWithMessage";

// >> getAllStoreOrders
export const getAllStoreOrders = createAsyncThunk("dashboard/getAllStoreOrders", async (data, thunkAPI) => {
  try {
    return await adminServices.getAllStoreOrders(data);
  } catch (error) {
    thunkRejectWithMessage(error, thunkAPI);
  }
});
// >> getOrderDetails
export const getOrderDetails = createAsyncThunk("dashboard/getOrderDetails", async (data, thunkAPI) => {
  try {
    return await adminServices.getOrderDetails(data);
  } catch (error) {
    thunkRejectWithMessage(error, thunkAPI);
  }
});
// >> updateOrderState
export const updateOrderState = createAsyncThunk("dashboard/updateOrderState", async (data, thunkAPI) => {
  try {
    return await adminServices.updateOrderState(data);
  } catch (error) {
    thunkRejectWithMessage(error, thunkAPI);
  }
});
// >> getAllStoreUsers
export const getAllStoreUsers = createAsyncThunk("dashboard/getAllStoreUsers", async (data, thunkAPI) => {
  try {
    return await adminServices.getAllUsers(data);
  } catch (error) {
    thunkRejectWithMessage(error, thunkAPI);
  }
});
// >> getOrdersStats
export const getOrdersStats = createAsyncThunk("dashboard/getOrdersStats", async (data, thunkAPI) => {
  try {
    return await adminServices.getOrdersStats(data);
  } catch (error) {
    thunkRejectWithMessage(error, thunkAPI);
  }
});
