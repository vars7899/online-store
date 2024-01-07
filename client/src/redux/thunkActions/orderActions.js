import { createAsyncThunk } from "@reduxjs/toolkit";
import { orderServices } from "../services";
import { thunkRejectWithMessage } from "../thunkRejectWithMessage";


// << GET_ORDER_CHARGES
export const GET_ORDER_CHARGES = createAsyncThunk("ORDER/GET_ORDER_CHARGES", async (data, thunkAPI) => {
  try {
    return await orderServices.GET_ORDER_CHARGES(data);
  } catch (error) {
    thunkRejectWithMessage(error, thunkAPI);
  }
});

// << CREATE_NEW_ORDER
export const CREATE_NEW_ORDER = createAsyncThunk("ORDER/CREATE_NEW_ORDER", async (data, thunkAPI) => {
  try {
    return await orderServices.CREATE_NEW_ORDER(data);
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
