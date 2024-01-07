import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-hot-toast";
import { dashboardThunkActions as DTA } from "../thunkActions";
import { $pendingHandler, $fulfilledHandler, $rejectionHandler } from "../utils";

const initialState = {
  isLoading: false,
  isError: false,
  isSuccess: false,
  message: null,
  categoryList: null,
  selectedCategoryProducts: null,
  productList: [],
  selectedProduct: null,
  orderWithSelectedProduct: [],
  newProductSuccess: false,
  // << Order related states
  orderList: [],
  selectedOrder: null,
  segregatedOrderList: {
    pending: [],
    paid: [],
    processing: [],
    shipped: [],
    outForDelivery: [],
    delivered: [],
    completed: [],
    canceled: [],
    onHold: [],
  },
  // << User related states
  userList: [],
  selectedUser: null,
  stats: {
    paymentMethod: null,
  },
};

const TYPE_OF_ORDER_STATE = [
  { setName: "pending", key: "Pending/Unpaid" },
  { setName: "paid", key: "Paid" },
  { setName: "processing", key: "Processing" },
  { setName: "shipped", key: "Shipped" },
  { setName: "outForDelivery", key: "Out for Delivery" },
  { setName: "delivered", key: "Delivered" },
  { setName: "completed", key: "Completed" },
  { setName: "canceled", key: "Canceled" },
  { setName: "onHold", key: "On Hold" },
];

const dashboardSlice = createSlice({
  name: "DASHBOARD",
  initialState,
  reducers: {
    RESET_DASHBOARD(state) {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.message = null;
    },
    segregateOrderType(state, action) {
      state.isLoading = true;
      let orders = action.payload;
      for (let idx = 0; idx < TYPE_OF_ORDER_STATE.length; idx++) {
        state.segregatedOrderList[TYPE_OF_ORDER_STATE[idx].setName] = orders.filter(
          (o) => o.orderState === TYPE_OF_ORDER_STATE[idx].key
        );
      }
      state.isLoading = false;
    },
  },
  extraReducers: (builder) => {
    // << CREATE_NEW_PRODUCT_CATEGORY
    builder.addCase(DTA.CREATE_NEW_PRODUCT_CATEGORY.pending, (state) => {
      $pendingHandler(state);
    });
    builder.addCase(DTA.CREATE_NEW_PRODUCT_CATEGORY.rejected, (state, action) => {
      $rejectionHandler(state, action);
    });
    builder.addCase(DTA.CREATE_NEW_PRODUCT_CATEGORY.fulfilled, (state, action) => {
      $fulfilledHandler(state, action);
      state.categoryList = action.payload.categoryList;
    });
    // << GET_ALL_PRODUCT_CATEGORIES
    builder.addCase(DTA.GET_ALL_PRODUCT_CATEGORIES.pending, (state) => {
      $pendingHandler(state);
    });
    builder.addCase(DTA.GET_ALL_PRODUCT_CATEGORIES.rejected, (state, action) => {
      $rejectionHandler(state, action);
      state.categoryList = [];
    });
    builder.addCase(DTA.GET_ALL_PRODUCT_CATEGORIES.fulfilled, (state, action) => {
      $fulfilledHandler(state, action);
      state.categoryList = action.payload.categoryList;
    });
    // << GET_ALL_PRODUCT_ASSOCIATED_WITH_CATEGORY
    builder.addCase(DTA.GET_ALL_PRODUCT_ASSOCIATED_WITH_CATEGORY.pending, (state) => {
      $pendingHandler(state);
    });
    builder.addCase(DTA.GET_ALL_PRODUCT_ASSOCIATED_WITH_CATEGORY.rejected, (state, action) => {
      $rejectionHandler(state, action);
      state.selectedCategoryProducts = [];
    });
    builder.addCase(DTA.GET_ALL_PRODUCT_ASSOCIATED_WITH_CATEGORY.fulfilled, (state, action) => {
      $fulfilledHandler(state, action);
      state.selectedCategoryProducts = action.payload.productList;
    });
    // << GET_ALL_PRODUCTS
    builder.addCase(DTA.GET_ALL_PRODUCTS.pending, (state) => {
      $pendingHandler(state);
    });
    builder.addCase(DTA.GET_ALL_PRODUCTS.rejected, (state, action) => {
      $rejectionHandler(state, action);
    });
    builder.addCase(DTA.GET_ALL_PRODUCTS.fulfilled, (state, action) => {
      $fulfilledHandler(state, action);
      state.productList = action.payload.productList;
    });
    // << UPDATE_PRODUCT_FEATURE_VISIBILITY
    builder.addCase(DTA.UPDATE_PRODUCT_FEATURE_VISIBILITY.pending, (state) => {
      $pendingHandler(state);
    });
    builder.addCase(DTA.UPDATE_PRODUCT_FEATURE_VISIBILITY.rejected, (state, action) => {
      $rejectionHandler(state, action);
    });
    builder.addCase(DTA.UPDATE_PRODUCT_FEATURE_VISIBILITY.fulfilled, (state, action) => {
      $fulfilledHandler(state, action);
      state.productList = action.payload.productList;
    });
    // << GET_PRODUCT_DETAILS
    builder.addCase(DTA.GET_PRODUCT_DETAILS.pending, (state) => {
      $pendingHandler(state);
    });
    builder.addCase(DTA.GET_PRODUCT_DETAILS.rejected, (state, action) => {
      $rejectionHandler(state, action);
    });
    builder.addCase(DTA.GET_PRODUCT_DETAILS.fulfilled, (state, action) => {
      $fulfilledHandler(state, action);
      state.selectedProduct = action.payload.product;
    });
    // << CREATE_NEW_PRODUCT
    builder.addCase(DTA.CREATE_NEW_PRODUCT.pending, (state) => {
      $pendingHandler(state);
    });
    builder.addCase(DTA.CREATE_NEW_PRODUCT.rejected, (state, action) => {
      $rejectionHandler(state, action);
    });
    builder.addCase(DTA.CREATE_NEW_PRODUCT.fulfilled, (state, action) => {
      $fulfilledHandler(state, action);
      toast.success("Product was added to the catalog successfully.");
    });
    // << GET_ALL_STORE_ORDERS
    builder.addCase(DTA.GET_ALL_STORE_ORDERS.pending, (state) => {
      $pendingHandler(state);
    });
    builder.addCase(DTA.GET_ALL_STORE_ORDERS.rejected, (state, action) => {
      $rejectionHandler(state, action);
    });
    builder.addCase(DTA.GET_ALL_STORE_ORDERS.fulfilled, (state, action) => {
      $fulfilledHandler(state, action);
      state.orderList = action.payload.orderList;
    });
    // << GET_ORDER_DETAILS
    builder.addCase(DTA.GET_ORDER_DETAILS.pending, (state) => {
      $pendingHandler(state);
    });
    builder.addCase(DTA.GET_ORDER_DETAILS.rejected, (state, action) => {
      $rejectionHandler(state, action);
    });
    builder.addCase(DTA.GET_ORDER_DETAILS.fulfilled, (state, action) => {
      $fulfilledHandler(state, action);
      state.selectedOrder = action.payload.order;
    });
    // << UPDATE_ORDER_STATE
    builder.addCase(DTA.UPDATE_ORDER_STATE.pending, (state) => {
      $pendingHandler(state);
    });
    builder.addCase(DTA.UPDATE_ORDER_STATE.rejected, (state, action) => {
      $rejectionHandler(state, action);
    });
    builder.addCase(DTA.UPDATE_ORDER_STATE.fulfilled, (state, action) => {
      $fulfilledHandler(state, action);
      state.selectedOrder = action.payload.order;
    });
    // << GET_ALL_STORE_USERS
    builder.addCase(DTA.GET_ALL_STORE_USERS.pending, (state) => {
      $pendingHandler(state);
    });
    builder.addCase(DTA.GET_ALL_STORE_USERS.rejected, (state, action) => {
      $rejectionHandler(state, action);
    });
    builder.addCase(DTA.GET_ALL_STORE_USERS.fulfilled, (state, action) => {
      $fulfilledHandler(state, action);
      state.userList = action.payload.userList;
    });
    // << GET_USER_PAYMENT_PREFERENCE
    builder.addCase(DTA.GET_USER_PAYMENT_PREFERENCE.pending, (state) => {
      $pendingHandler(state);
    });
    builder.addCase(DTA.GET_USER_PAYMENT_PREFERENCE.rejected, (state, action) => {
      $rejectionHandler(state, action);
    });
    builder.addCase(DTA.GET_USER_PAYMENT_PREFERENCE.fulfilled, (state, action) => {
      $fulfilledHandler(state, action);
      state.stats.paymentMethod = action.payload.paymentMethodStat;
    });
    // << UPDATE_PRODUCT_DETAILS
    builder.addCase(DTA.UPDATE_PRODUCT_DETAILS.pending, (state) => {
      $pendingHandler(state);
    });
    builder.addCase(DTA.UPDATE_PRODUCT_DETAILS.rejected, (state, action) => {
      $rejectionHandler(state, action);
    });
    builder.addCase(DTA.UPDATE_PRODUCT_DETAILS.fulfilled, (state, action) => {
      $fulfilledHandler(state, action);
      state.selectedProduct = action.payload.product;
      toast.success(action.payload.message);
    });
    // << GET_ALL_ORDERS_ASSOCIATED_WITH_PRODUCT
    builder.addCase(DTA.GET_ALL_ORDERS_ASSOCIATED_WITH_PRODUCT.pending, (state) => {
      $pendingHandler(state);
    });
    builder.addCase(DTA.GET_ALL_ORDERS_ASSOCIATED_WITH_PRODUCT.rejected, (state, action) => {
      $rejectionHandler(state, action);
    });
    builder.addCase(DTA.GET_ALL_ORDERS_ASSOCIATED_WITH_PRODUCT.fulfilled, (state, action) => {
      $fulfilledHandler(state, action);
      state.orderWithSelectedProduct = action.payload.orderList;
    });
  },
});

export const { RESET_DASHBOARD, segregateOrderType } = dashboardSlice.actions;

export default dashboardSlice.reducer;
