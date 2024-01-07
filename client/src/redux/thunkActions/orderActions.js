import { createAsyncThunk } from "@reduxjs/toolkit";
import { orderServices } from "../services";
import { thunkRejectWithMessage } from "../thunkRejectWithMessage";

export const generateOrderCharges = createAsyncThunk("ORDER/generateOrderCharges", async (data, thunkAPI) => {
  try {
    return await orderServices.generateOrderCharges(data);
  } catch (error) {
    thunkRejectWithMessage(error, thunkAPI);
  }
});
export const createNewOrder = createAsyncThunk("ORDER/createNewOrder", async (data, thunkAPI) => {
  try {
    return await orderServices.createNewOrder(data);
  } catch (error) {
    thunkRejectWithMessage(error, thunkAPI);
  }
});

// << GET_ALL_USER_ORDERS
export const GET_ALL_USER_ORDERS = createAsyncThunk("ORDER/GET_ALL_USER_ORDERS", async (data, thunkAPI) => {
  try {
    return await orderServices.GET_ALL_USER_ORDERS(data);
  } catch (error) {
    thunkRejectWithMessage(error, thunkAPI);
  }
});
