import { createAsyncThunk } from "@reduxjs/toolkit";
import { paymentServices, transactionServices } from "../services";
import { thunkRejectWithMessage } from "../thunkRejectWithMessage";

// << GET_STRIPE_PUBLIC_KEY
export const GET_STRIPE_PUBLIC_KEY = createAsyncThunk("PAYMENT/GET_STRIPE_PUBLIC_KEY", async (thunkAPI) => {
  try {
    return await paymentServices.GET_STRIPE_PUBLIC_KEY();
  } catch (error) {
    thunkRejectWithMessage(error, thunkAPI);
  }
});

// << CREATE_NEW_PAYMENT_INTENT
export const CREATE_NEW_PAYMENT_INTENT = createAsyncThunk(
  "PAYMENT/CREATE_NEW_PAYMENT_INTENT",
  async (data, thunkAPI) => {
    try {
      return await paymentServices.CREATE_NEW_PAYMENT_INTENT(data);
    } catch (error) {
      thunkRejectWithMessage(error, thunkAPI);
    }
  }
);

// << CREATE_NEW_PAYMENT_INTENT_FOR_WALLET
export const CREATE_NEW_PAYMENT_INTENT_FOR_WALLET = createAsyncThunk(
  "PAYMENT/CREATE_NEW_PAYMENT_INTENT_FOR_WALLET",
  async (data, thunkAPI) => {
    try {
      return await paymentServices.CREATE_NEW_PAYMENT_INTENT_FOR_WALLET(data);
    } catch (error) {
      thunkRejectWithMessage(error, thunkAPI);
    }
  }
);

// << CREATE_NEW_TRANSACTION_RECORD
export const CREATE_NEW_TRANSACTION_RECORD = createAsyncThunk(
  "PAYMENT/CREATE_NEW_TRANSACTION_RECORD",
  async (data, thunkAPI) => {
    try {
      return await transactionServices.CREATE_NEW_TRANSACTION_RECORD(data);
    } catch (error) {
      thunkRejectWithMessage(error, thunkAPI);
    }
  }
);

// << GET_ALL_USER_TRANSACTIONS
export const GET_ALL_USER_TRANSACTIONS = createAsyncThunk(
  "PAYMENT/GET_ALL_USER_TRANSACTIONS",
  async (data, thunkAPI) => {
    try {
      return await transactionServices.GET_ALL_USER_TRANSACTIONS(data);
    } catch (error) {
      thunkRejectWithMessage(error, thunkAPI);
    }
  }
);

