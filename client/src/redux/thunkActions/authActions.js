import { createAsyncThunk } from "@reduxjs/toolkit";
import { authServices, userServices } from "../services";
import { thunkRejectWithMessage } from "../thunkRejectWithMessage";

// << REGISTER_USER
export const REGISTER_USER = createAsyncThunk("AUTH/REGISTER_USER", async (data, thunkAPI) => {
  try {
    return await authServices.REGISTER_USER(data);
  } catch (error) {
    thunkRejectWithMessage(error, thunkAPI);
  }
});

// << LOGIN_USER
export const LOGIN_USER = createAsyncThunk("AUTH/LOGIN_USER", async (data, thunkAPI) => {
  try {
    return await authServices.LOGIN_USER(data);
  } catch (error) {
    thunkRejectWithMessage(error, thunkAPI);
  }
});

// << CHECK_LOGIN_STATUS
export const CHECK_LOGIN_STATUS = createAsyncThunk("AUTH/CHECK_LOGIN_STATUS", async (_, thunkAPI) => {
  try {
    return await authServices.CHECK_LOGIN_STATUS();
  } catch (error) {
    thunkRejectWithMessage(error, thunkAPI);
  }
});

// << UPDATE_USER_DETAILS
export const UPDATE_USER_DETAILS = createAsyncThunk("AUTH/UPDATE_USER_DETAILS", async (data, thunkAPI) => {
  try {
    return await userServices.UPDATE_USER_DETAILS(data);
  } catch (error) {
    thunkRejectWithMessage(error, thunkAPI);
  }
});

// << UPDATE_USER_PASSWORD
export const UPDATE_USER_PASSWORD = createAsyncThunk("AUTH/UPDATE_USER_PASSWORD", async (data, thunkAPI) => {
  try {
    return await userServices.UPDATE_USER_PASSWORD(data);
  } catch (error) {
    thunkRejectWithMessage(error, thunkAPI);
  }
});

// << LOGOUT_USER
export const LOGOUT_USER = createAsyncThunk("AUTH/LOGOUT_USER", async (data, thunkAPI) => {
  try {
    return await authServices.LOGOUT_USER(data);
  } catch (error) {
    thunkRejectWithMessage(error, thunkAPI);
  }
});

// << GET_USER_DETAILS
export const GET_USER_DETAILS = createAsyncThunk("AUTH/GET_USER_DETAILS", async (thunkAPI) => {
  try {
    return await userServices.GET_USER_DETAILS();
  } catch (error) {
    thunkRejectWithMessage(error, thunkAPI);
  }
});
