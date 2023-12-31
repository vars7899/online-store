import { createAsyncThunk } from "@reduxjs/toolkit";
import * as orderService from "../services/order";

export const generateOrderCharges = createAsyncThunk("order/generateOrderCharges", async (data, thunkAPI) => {
  try {
    return await orderService.generateOrderCharges(data);
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) || error.message || error.toString();

    return thunkAPI.rejectWithValue(message);
  }
});
export const createNewOrder = createAsyncThunk("order/createNewOrder", async (data, thunkAPI) => {
  try {
    return await orderService.createNewOrder(data);
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) || error.message || error.toString();

    return thunkAPI.rejectWithValue(message);
  }
});
// >> updateOrderPayment
export const updateOrderPayment = createAsyncThunk("order/updateOrderPayment", async (data, thunkAPI) => {
  try {
    return await orderService.updateOrderPayment(data);
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) || error.message || error.toString();

    return thunkAPI.rejectWithValue(message);
  }
});
// >> getAllUserOrders
export const getAllUserOrders = createAsyncThunk("order/getAllUserOrders", async (data, thunkAPI) => {
  try {
    return await orderService.getAllUserOrders(data);
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) || error.message || error.toString();

    return thunkAPI.rejectWithValue(message);
  }
});
