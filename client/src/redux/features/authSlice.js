import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { authServices, userServices } from "../services";
import toast from "react-hot-toast";

const initialState = {
  isLoading: false,
  isSuccess: false,
  isError: false,
  message: null,
  user: null,
  isLoggedIn: false,
};

export const REGISTER_USER = createAsyncThunk("auth/registerUser", async (data, thunkAPI) => {
  try {
    return await authServices.registerUser(data);
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) || error.message || error.toString();

    return thunkAPI.rejectWithValue(message);
  }
});

export const LOGIN_USER = createAsyncThunk("auth/loginUser", async (data, thunkAPI) => {
  try {
    return await authServices.loginUser(data);
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) || error.message || error.toString();

    return thunkAPI.rejectWithValue(message);
  }
});

export const CHECK_LOGIN_STATUS = createAsyncThunk("auth/checkLoginStatus", async (_, thunkAPI) => {
  try {
    return await authServices.checkLoginStatus();
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) || error.message || error.toString();

    return thunkAPI.rejectWithValue(message);
  }
});
// ! UPDATE_USER_DETAILS
export const UPDATE_USER_DETAILS = createAsyncThunk("auth/updateUserDetails", async (data, thunkAPI) => {
  try {
    return await userServices.updateUserDetails(data);
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) || error.message || error.toString();

    return thunkAPI.rejectWithValue(message);
  }
});
// ! UPDATE_USER_PASSWORD
export const UPDATE_USER_PASSWORD = createAsyncThunk("auth/updateUserPassword", async (data, thunkAPI) => {
  try {
    return await userServices.updateUserPassword(data);
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) || error.message || error.toString();

    return thunkAPI.rejectWithValue(message);
  }
});
// >> logoutUser
export const logoutUser = createAsyncThunk("auth/logoutUser", async (data, thunkAPI) => {
  try {
    return await authServices.logoutUser(data);
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

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
const authSlice = createSlice({
  name: "auth",
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
    // REGISTER_USER
    builder.addCase(REGISTER_USER.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(REGISTER_USER.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.message = action.payload.message;
      state.user = null;
      state.isLoggedIn = false;
    });
    builder.addCase(REGISTER_USER.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.message = action.payload.message;
      state.user = action.payload.user;
      state.isLoggedIn = true;
      toast.success(action.payload.message);
    });
    // LOGIN_USER
    builder.addCase(LOGIN_USER.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(LOGIN_USER.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.message = action.payload.message;
      state.user = null;
      state.isLoggedIn = false;
    });
    builder.addCase(LOGIN_USER.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.message = action.payload.message;
      state.user = action.payload.user;
      state.isLoggedIn = true;
    });
    // CHECK_LOGIN_STATUS
    builder.addCase(CHECK_LOGIN_STATUS.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(CHECK_LOGIN_STATUS.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.message = action.payload.message;
    });
    builder.addCase(CHECK_LOGIN_STATUS.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.message = action.payload.message;
      state.user = action.payload.user;
      state.isLoggedIn = action.payload.success;
    });
    // ! UPDATE_USER_DETAILS
    builder.addCase(UPDATE_USER_DETAILS.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(UPDATE_USER_DETAILS.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.message = action.payload.message;
    });
    builder.addCase(UPDATE_USER_DETAILS.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.message = action.payload.message;
      state.user = action.payload.user;
      state.isLoggedIn = action.payload.success;
    });
    // ! UPDATE_USER_PASSWORD
    builder.addCase(UPDATE_USER_PASSWORD.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(UPDATE_USER_PASSWORD.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.message = action.payload.message;
    });
    builder.addCase(UPDATE_USER_PASSWORD.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.message = action.payload.message;
      state.user = action.payload.user;
      state.isLoggedIn = action.payload.success;
      toast.success("Profile password updated successfully");
    });
    // !! logoutUser
    builder.addCase(logoutUser.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(logoutUser.rejected, (state, action) => {
      $rejectionHandler();
    });
    builder.addCase(logoutUser.fulfilled, (state, action) => {
      $fulfilledHandler();
      state.user = action.payload.user;
      state.isLoggedIn = action.payload.success;
      toast.success("User logged out");
    });
  },
});

export const { RESET_AUTH } = authSlice.actions;

export default authSlice.reducer;
