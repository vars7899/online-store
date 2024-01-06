import { createSlice } from "@reduxjs/toolkit";
import * as ordersThunkActions from "../thunkActions/orderActions";

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

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    resetOrder(state) {
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = false;
      state.message = null;
    },
    // >> New order details actions
    updateNewOrderTotal(state, action) {
      state.newOrderDetails.total = action.payload;
    },

    updateNewOrderDetails(state, action) {
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
    resetNewOrderDetails(state) {
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
    builder.addCase(ordersThunkActions.createNewOrder.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(ordersThunkActions.createNewOrder.rejected, (state, action) => {
      $rejectionHandler(state, action);
    });
    builder.addCase(ordersThunkActions.createNewOrder.fulfilled, (state, action) => {
      $fulfilledHandler(state, action);
      state.selectedOrder = action.payload.order;
    });
    // ! generateOrderCharges
    builder.addCase(ordersThunkActions.generateOrderCharges.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(ordersThunkActions.generateOrderCharges.rejected, (state, action) => {
      $rejectionHandler(state, action);
    });
    builder.addCase(ordersThunkActions.generateOrderCharges.fulfilled, (state, action) => {
      $fulfilledHandler(state, action);
      state.charges.subtotal = action.payload.charges.subtotal;
      state.charges.total = action.payload.charges.total;
      state.charges.convenienceFees = action.payload.charges.convenienceFees;
      state.charges.shippingCharges = action.payload.charges.shippingCharges;
      state.charges.gst = action.payload.charges.gst;
      state.charges.pst = action.payload.charges.pst;
    });
    // >> updateOrderPayment
    builder.addCase(ordersThunkActions.updateOrderPayment.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(ordersThunkActions.updateOrderPayment.rejected, (state, action) => {
      $rejectionHandler(state, action);
    });
    builder.addCase(ordersThunkActions.updateOrderPayment.fulfilled, (state, action) => {
      $fulfilledHandler(state, action);
      state.selectedOrder = action.payload.order;
    });
    // >> getAllUserOrders
    builder.addCase(ordersThunkActions.getAllUserOrders.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(ordersThunkActions.getAllUserOrders.rejected, (state, action) => {
      $rejectionHandler(state, action);
    });
    builder.addCase(ordersThunkActions.getAllUserOrders.fulfilled, (state, action) => {
      $fulfilledHandler(state, action);
      state.orderList = action.payload.orderList;
    });
  },
});

export const { resetOrder, updateNewOrderTotal, updateNewOrderDetails, resetNewOrderDetails } = orderSlice.actions;

export default orderSlice.reducer;
