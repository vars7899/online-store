import { createSlice } from "@reduxjs/toolkit";
import { paymentThunkActions } from "../thunkActions";

const initialState = {
  isLoading: false,
  isSuccess: false,
  isError: false,
  message: null,
  publicKey: null,
  clientSecret: null,
  transactionHistoryList: [],
};

const $rejectionHandler = (state, action) => {
  state.isLoading = false;
  state.isError = true;
  state.message = action.payload;
};
const $fulfilledHandler = (state, action) => {
  state.isLoading = false;
  state.isSuccess = true;
  state.message = action.payload.message;
};

const paymentSlice = createSlice({
  name: "payment",
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
    builder.addCase(paymentThunkActions.getStripePublicKey.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(paymentThunkActions.getStripePublicKey.rejected, (state, action) => {
      $rejectionHandler(state, action);
    });
    builder.addCase(paymentThunkActions.getStripePublicKey.fulfilled, (state, action) => {
      $fulfilledHandler(state, action);
      state.publicKey = action.payload.stripePublicKey;
    });
    // ! createNewPaymentIntent
    builder.addCase(paymentThunkActions.createNewPaymentIntent.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(paymentThunkActions.createNewPaymentIntent.rejected, (state, action) => {
      $rejectionHandler(state, action);
    });
    builder.addCase(paymentThunkActions.createNewPaymentIntent.fulfilled, (state, action) => {
      $fulfilledHandler(state, action);
      state.clientSecret = action.payload.client_secret;
    });
    // ! createNewPaymentIntentForWallet
    builder.addCase(paymentThunkActions.createNewPaymentIntentForWallet.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(paymentThunkActions.createNewPaymentIntentForWallet.rejected, (state, action) => {
      $rejectionHandler(state, action);
    });
    builder.addCase(paymentThunkActions.createNewPaymentIntentForWallet.fulfilled, (state, action) => {
      $fulfilledHandler(state, action);
      state.clientSecret = action.payload.client_secret;
    });
    // ! createNewTransactionRecord
    builder.addCase(paymentThunkActions.createNewTransactionRecord.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(paymentThunkActions.createNewTransactionRecord.rejected, (state, action) => {
      $rejectionHandler(state, action);
    });
    builder.addCase(paymentThunkActions.createNewTransactionRecord.fulfilled, (state, action) => {
      $fulfilledHandler(state, action);
      state.transactionHistoryList = action.payload.transactionHistoryList;
    });
    // ! getAllUserTransactions
    builder.addCase(paymentThunkActions.getAllUserTransactions.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(paymentThunkActions.getAllUserTransactions.rejected, (state, action) => {
      $rejectionHandler(state, action);
    });
    builder.addCase(paymentThunkActions.getAllUserTransactions.fulfilled, (state, action) => {
      $fulfilledHandler(state, action);
      state.transactionHistoryList = action.payload.transactionHistoryList;
    });
    // ! getAllUserTransactions
    builder.addCase(paymentThunkActions.payOrderWithWallet.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(paymentThunkActions.payOrderWithWallet.rejected, (state, action) => {
      $rejectionHandler(state, action);
    });
    builder.addCase(paymentThunkActions.payOrderWithWallet.fulfilled, (state, action) => {
      $fulfilledHandler(state, action);
    });
  },
});

export const { resetPayment } = paymentSlice.actions;

export default paymentSlice.reducer;
