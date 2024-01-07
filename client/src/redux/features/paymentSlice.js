import { createSlice } from "@reduxjs/toolkit";
import { paymentThunkActions as PTA } from "../thunkActions";
import { $pendingHandler, $rejectionHandler, $fulfilledHandler } from "../utils";

const initialState = {
  isLoading: false,
  isSuccess: false,
  isError: false,
  message: null,
  publicKey: null,
  clientSecret: null,
  transactionHistoryList: [],
};

const paymentSlice = createSlice({
  name: "PAYMENT",
  initialState,
  reducers: {
    resetPayment(state) {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.message = null;
    },
  },
  extraReducers: (builder) => {
    // << GET_STRIPE_PUBLIC_KEY
    builder.addCase(PTA.GET_STRIPE_PUBLIC_KEY.pending, (state) => {
      $pendingHandler(state);
    });
    builder.addCase(PTA.GET_STRIPE_PUBLIC_KEY.rejected, (state, action) => {
      $rejectionHandler(state, action);
    });
    builder.addCase(PTA.GET_STRIPE_PUBLIC_KEY.fulfilled, (state, action) => {
      $fulfilledHandler(state, action);
      state.publicKey = action.payload.stripePublicKey;
    });
    // << CREATE_NEW_PAYMENT_INTENT
    builder.addCase(PTA.CREATE_NEW_PAYMENT_INTENT.pending, (state) => {
      $pendingHandler(state);
    });
    builder.addCase(PTA.CREATE_NEW_PAYMENT_INTENT.rejected, (state, action) => {
      $rejectionHandler(state, action);
    });
    builder.addCase(PTA.CREATE_NEW_PAYMENT_INTENT.fulfilled, (state, action) => {
      $fulfilledHandler(state, action);
      state.clientSecret = action.payload.client_secret;
    });
    // << CREATE_NEW_PAYMENT_INTENT_FOR_WALLET
    builder.addCase(PTA.CREATE_NEW_PAYMENT_INTENT_FOR_WALLET.pending, (state) => {
      $pendingHandler(state);
    });
    builder.addCase(PTA.CREATE_NEW_PAYMENT_INTENT_FOR_WALLET.rejected, (state, action) => {
      $rejectionHandler(state, action);
    });
    builder.addCase(PTA.CREATE_NEW_PAYMENT_INTENT_FOR_WALLET.fulfilled, (state, action) => {
      $fulfilledHandler(state, action);
      state.clientSecret = action.payload.client_secret;
    });
    // << CREATE_NEW_TRANSACTION_RECORD
    builder.addCase(PTA.CREATE_NEW_TRANSACTION_RECORD.pending, (state) => {
      $pendingHandler(state);
    });
    builder.addCase(PTA.CREATE_NEW_TRANSACTION_RECORD.rejected, (state, action) => {
      $rejectionHandler(state, action);
    });
    builder.addCase(PTA.CREATE_NEW_TRANSACTION_RECORD.fulfilled, (state, action) => {
      $fulfilledHandler(state, action);
      state.transactionHistoryList = action.payload.transactionHistoryList;
    });
    // << GET_ALL_USER_TRANSACTIONS
    builder.addCase(PTA.GET_ALL_USER_TRANSACTIONS.pending, (state) => {
      $pendingHandler(state);
    });
    builder.addCase(PTA.GET_ALL_USER_TRANSACTIONS.rejected, (state, action) => {
      $rejectionHandler(state, action);
    });
    builder.addCase(PTA.GET_ALL_USER_TRANSACTIONS.fulfilled, (state, action) => {
      $fulfilledHandler(state, action);
      state.transactionHistoryList = action.payload.transactionHistoryList;
    });
  },
});

export const { resetPayment } = paymentSlice.actions;

export default paymentSlice.reducer;
