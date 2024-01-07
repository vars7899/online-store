import { createSlice } from "@reduxjs/toolkit";
import { authThunkActions as ATA } from "../thunkActions";
import { $pendingHandler, $rejectionHandler, $fulfilledHandler } from "../utils";
import toast from "react-hot-toast";

const initialState = {
  isLoading: false,
  isSuccess: false,
  isError: false,
  message: null,
  user: null,
  isLoggedIn: false,
};

const authSlice = createSlice({
  name: "AUTH",
  initialState,
  reducers: {
    RESET_AUTH(state) {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.message = null;
    },
  },
  extraReducers: (builder) => {
    // << REGISTER_USER
    builder.addCase(ATA.REGISTER_USER.pending, (state) => {
      $pendingHandler(state);
    });
    builder.addCase(ATA.REGISTER_USER.rejected, (state, action) => {
      $rejectionHandler(state, action);
      state.user = null;
      state.isLoggedIn = false;
    });
    builder.addCase(ATA.REGISTER_USER.fulfilled, (state, action) => {
      $fulfilledHandler(state, action);
      state.user = action.payload.user;
      state.isLoggedIn = true;
      toast.success(action.payload.message);
    });
    // << LOGIN_USER
    builder.addCase(ATA.LOGIN_USER.pending, (state) => {
      $pendingHandler(state);
    });
    builder.addCase(ATA.LOGIN_USER.rejected, (state, action) => {
      $rejectionHandler(state, action);
      state.user = null;
      state.isLoggedIn = false;
    });
    builder.addCase(ATA.LOGIN_USER.fulfilled, (state, action) => {
      $fulfilledHandler(state, action);
      state.user = action.payload.user;
      state.isLoggedIn = true;
    });
    // << CHECK_LOGIN_STATUS
    builder.addCase(ATA.CHECK_LOGIN_STATUS.pending, (state) => {
      $pendingHandler(state);
    });
    builder.addCase(ATA.CHECK_LOGIN_STATUS.rejected, (state, action) => {
      $rejectionHandler(state, action);
    });
    builder.addCase(ATA.CHECK_LOGIN_STATUS.fulfilled, (state, action) => {
      $fulfilledHandler(state, action);
      state.user = action.payload.user;
      state.isLoggedIn = action.payload.success;
    });
    // << UPDATE_USER_DETAILS
    builder.addCase(ATA.UPDATE_USER_DETAILS.pending, (state) => {
      $pendingHandler(state);
    });
    builder.addCase(ATA.UPDATE_USER_DETAILS.rejected, (state, action) => {
      $rejectionHandler(state, action);
    });
    builder.addCase(ATA.UPDATE_USER_DETAILS.fulfilled, (state, action) => {
      $fulfilledHandler(state, action);
      state.user = action.payload.user;
      state.isLoggedIn = action.payload.success;
    });
    // << UPDATE_USER_PASSWORD
    builder.addCase(ATA.UPDATE_USER_PASSWORD.pending, (state) => {
      $pendingHandler(state);
    });
    builder.addCase(ATA.UPDATE_USER_PASSWORD.rejected, (state, action) => {
      $rejectionHandler(state, action);
    });
    builder.addCase(ATA.UPDATE_USER_PASSWORD.fulfilled, (state, action) => {
      $fulfilledHandler(state, action);
      state.user = action.payload.user;
      state.isLoggedIn = action.payload.success;
      toast.success("Profile password updated successfully");
    });
    // << LOGOUT_USER
    builder.addCase(ATA.LOGOUT_USER.pending, (state) => {
      $pendingHandler(state);
    });
    builder.addCase(ATA.LOGOUT_USER.rejected, (state, action) => {
      $rejectionHandler(state, action);
    });
    builder.addCase(ATA.LOGOUT_USER.fulfilled, (state, action) => {
      $fulfilledHandler(state, action);
      state.user = action.payload.user;
      state.isLoggedIn = action.payload.success;
      toast.success("User logged out");
    });
    // << GET_USER_DETAILS
    builder.addCase(ATA.GET_USER_DETAILS.pending, (state) => {
      $pendingHandler(state);
    });
    builder.addCase(ATA.GET_USER_DETAILS.rejected, (state, action) => {
      $rejectionHandler(state, action);
    });
    builder.addCase(ATA.GET_USER_DETAILS.fulfilled, (state, action) => {
      $fulfilledHandler(state, action);
      state.user = action.payload.user;
      state.isLoggedIn = action.payload.success;
    });
  },
});

export const { RESET_AUTH } = authSlice.actions;

export default authSlice.reducer;
