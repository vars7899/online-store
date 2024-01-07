import { createSlice } from "@reduxjs/toolkit";
import { orderThunkActions as OTA } from "../thunkActions";
import { $pendingHandler, $rejectionHandler, $fulfilledHandler } from "../utils";

const initialState = {
  isLoading: false,
  isSuccess: false,
  isError: false,
  message: null,
  orderList: [],
  selectedOrder: null,
  charges: {
    subtotal: "",
    convenienceFees: "",
    pst: "",
    gst: "",
    total: "",
    shippingCharges: "",
  },
  newOrderDetails: {
    isFilled: false,
    shippingAddressId: "",
    billingAddressId: "",
    shippingMethod: "",
    shippingServiceType: "",
    estimatedDeliveryDate: "",
    orderItems: "",
    paymentMethod: "",
    paymentInfo: {
      paymentDate: "",
      paymentStatus: "",
      paymentAmount: "",
      paymentId: "",
    },
    total: 0,
  },
};

const orderSlice = createSlice({
  name: "ORDER",
  initialState,
  reducers: {
    RESET_ORDER(state) {
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = false;
      state.message = null;
    },
    UPDATE_NEW_ORDER_TOTAL(state, action) {
      state.newOrderDetails.total = action.payload;
    },
    UPDATE_NEW_ORDER_DETAILS(state, action) {
      state.newOrderDetails.isFilled = true;
      // >> Shipping details
      state.newOrderDetails.shippingMethod = action.payload.shippingMethod;
      state.newOrderDetails.shippingServiceType = action.payload.shippingServiceType;
      state.newOrderDetails.estimatedDeliveryDate = action.payload.estimatedDeliveryDate;
      // >> Address details
      state.newOrderDetails.billingAddressId = action.payload.billingAddressId;
      state.newOrderDetails.shippingAddressId = action.payload.shippingAddressId;
      // >> Payment details
      state.newOrderDetails.paymentMethod = action.payload.paymentMethod;
      // >> Order items details
      state.newOrderDetails.orderItems = action.payload.orderItems;
    },
    RESET_NEW_ORDER_DETAILS(state) {
      state.newOrderDetails.isFilled = false;
      // >> Shipping details
      state.newOrderDetails.shippingMethod = "";
      state.newOrderDetails.shippingServiceType = "";
      state.newOrderDetails.estimatedDeliveryDate = "";
      // >> Address details
      state.newOrderDetails.billingAddressId = "";
      state.newOrderDetails.shippingAddressId = "";
      // >> Payment details
      state.newOrderDetails.paymentMethod = "";
      // >> Order items details
      state.newOrderDetails.orderItems = "";
      state.newOrderDetails.total = 0;
    },
  },
  extraReducers: (builder) => {
    // << CREATE_NEW_ORDER
    builder.addCase(OTA.CREATE_NEW_ORDER.pending, (state) => {
      $pendingHandler(state);
    });
    builder.addCase(OTA.CREATE_NEW_ORDER.rejected, (state, action) => {
      $rejectionHandler(state, action);
    });
    builder.addCase(OTA.CREATE_NEW_ORDER.fulfilled, (state, action) => {
      $fulfilledHandler(state, action);
      state.selectedOrder = action.payload.order;
    });
    //  << GET_ORDER_CHARGES
    builder.addCase(OTA.GET_ORDER_CHARGES.pending, (state) => {
      $pendingHandler(state);
    });
    builder.addCase(OTA.GET_ORDER_CHARGES.rejected, (state, action) => {
      $rejectionHandler(state, action);
    });
    builder.addCase(OTA.GET_ORDER_CHARGES.fulfilled, (state, action) => {
      $fulfilledHandler(state, action);
      state.charges.subtotal = action.payload.charges.subtotal;
      state.charges.total = action.payload.charges.total;
      state.charges.convenienceFees = action.payload.charges.convenienceFees;
      state.charges.shippingCharges = action.payload.charges.shippingCharges;
      state.charges.gst = action.payload.charges.gst;
      state.charges.pst = action.payload.charges.pst;
    });
    // << GET_ALL_USER_ORDERS
    builder.addCase(OTA.GET_ALL_USER_ORDERS.pending, (state) => {
      $pendingHandler(state);
    });
    builder.addCase(OTA.GET_ALL_USER_ORDERS.rejected, (state, action) => {
      $rejectionHandler(state, action);
    });
    builder.addCase(OTA.GET_ALL_USER_ORDERS.fulfilled, (state, action) => {
      $fulfilledHandler(state, action);
      state.orderList = action.payload.orderList;
    });
  },
});

export const { RESET_ORDER, UPDATE_NEW_ORDER_TOTAL, UPDATE_NEW_ORDER_DETAILS, RESET_NEW_ORDER_DETAILS } =
  orderSlice.actions;

export default orderSlice.reducer;
