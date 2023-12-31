import { createAsyncThunk } from "@reduxjs/toolkit";
import { paymentServices, transactionServices } from "../services";

export const getStripePublicKey = createAsyncThunk("payment/getStripePublicKey", async (thunkAPI) => {
  try {
    return await paymentServices.getStripePublicKeyFromServer();
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) || error.message || error.toString();

    return thunkAPI.rejectWithValue(message);
  }
});

export const createNewPaymentIntent = createAsyncThunk("payment/createNewPaymentIntent", async (data, thunkAPI) => {
  try {
    return await paymentServices.createPaymentIntent(data);
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) || error.message || error.toString();

    return thunkAPI.rejectWithValue(message);
  }
});

export const createNewPaymentIntentForWallet = createAsyncThunk(
  "payment/createNewPaymentIntentForWallet",
  async (data, thunkAPI) => {
    try {
      return await paymentServices.createNewPaymentIntentForWallet(data);
    } catch (error) {
      const message =
        (error.response && error.response.data && error.response.data.message) || error.message || error.toString();

      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const createNewTransactionRecord = createAsyncThunk(
  "payment/createNewTransactionRecord",
  async (data, thunkAPI) => {
    try {
      return await transactionServices.createNewTransactionRecord(data);
    } catch (error) {
      const message =
        (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const getAllUserTransactions = createAsyncThunk("payment/getAllUserTransactions", async (data, thunkAPI) => {
  try {
    return await transactionServices.getAllUserTransactions(data);
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});
