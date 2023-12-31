import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as categoryService from "../services/category";
import * as productService from "../services/product";
import { toast } from "react-hot-toast";
import { dashboardThunkActions as DTA } from "../thunkActions";

const initialState = {
  isLoading: false,
  isError: false,
  isSuccess: false,
  message: null,
  categoryList: null,
  selectedCategoryProducts: null,
  productList: [],
  selectedProduct: null,
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

// CREATE_NEW_PRODUCT_CATEGORY
export const CREATE_NEW_PRODUCT_CATEGORY = createAsyncThunk(
  "dashboard/createNewProductCategory",
  async (data, thunkAPI) => {
    try {
      return await categoryService.createNewProductCategory(data);
    } catch (error) {
      const message =
        (error.response && error.response.data && error.response.data.message) || error.message || error.toString();

      return thunkAPI.rejectWithValue(message);
    }
  }
);
// GET_ALL_PRODUCT_CATEGORIES
export const GET_ALL_PRODUCT_CATEGORIES = createAsyncThunk("dashboard/getAllProductCategories", async (thunkAPI) => {
  try {
    return await categoryService.getAllProductCategories();
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) || error.message || error.toString();

    return thunkAPI.rejectWithValue(message);
  }
});
// GET_ALL_PRODUCT_ASSOCIATED_WITH_CATEGORY
export const GET_ALL_PRODUCT_ASSOCIATED_WITH_CATEGORY = createAsyncThunk(
  "dashboard/getAllProductAssociatedWithCategory",
  async (data, thunkAPI) => {
    try {
      return await categoryService.getAllProductAssociatedWithCategory(data);
    } catch (error) {
      const message =
        (error.response && error.response.data && error.response.data.message) || error.message || error.toString();

      return thunkAPI.rejectWithValue(message);
    }
  }
);
// GET_ALL_PRODUCTS
export const GET_ALL_PRODUCTS = createAsyncThunk("dashboard/getAllProducts", async (thunkAPI) => {
  try {
    return await productService.getAllProducts();
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) || error.message || error.toString();

    return thunkAPI.rejectWithValue(message);
  }
});
// UPDATE_PRODUCT_FEATURE_VISIBILITY
export const UPDATE_PRODUCT_FEATURE_VISIBILITY = createAsyncThunk(
  "dashboard/updateProductFeatureVisibility",
  async (data, thunkAPI) => {
    try {
      return await productService.updateProductFeatureVisibility(data);
    } catch (error) {
      const message =
        (error.response && error.response.data && error.response.data.message) || error.message || error.toString();

      return thunkAPI.rejectWithValue(message);
    }
  }
);
// GET_PRODUCT_DETAILS
export const GET_PRODUCT_DETAILS = createAsyncThunk("dashboard/getProductDetails", async (data, thunkAPI) => {
  try {
    return await productService.getProductDetails(data);
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) || error.message || error.toString();

    return thunkAPI.rejectWithValue(message);
  }
});

// CREATE_NEW_PRODUCT
export const CREATE_NEW_PRODUCT = createAsyncThunk("dashboard/createNewProduct", async (data, thunkAPI) => {
  try {
    return await productService.createNewProduct(data);
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
  name: "dashboard",
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
    builder.addCase(CREATE_NEW_PRODUCT_CATEGORY.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(CREATE_NEW_PRODUCT_CATEGORY.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.message = action.payload;
    });
    builder.addCase(CREATE_NEW_PRODUCT_CATEGORY.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.message = action.payload.message;
      state.categoryList = action.payload.categoryList;
    });
    builder.addCase(GET_ALL_PRODUCT_CATEGORIES.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(GET_ALL_PRODUCT_CATEGORIES.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.message = action.payload;
      state.categoryList = [];
    });
    builder.addCase(GET_ALL_PRODUCT_CATEGORIES.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.message = action.payload.message;
      state.categoryList = action.payload.categoryList;
    });
    builder.addCase(GET_ALL_PRODUCT_ASSOCIATED_WITH_CATEGORY.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(GET_ALL_PRODUCT_ASSOCIATED_WITH_CATEGORY.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.message = action.payload;
      state.selectedCategoryProducts = [];
    });
    builder.addCase(GET_ALL_PRODUCT_ASSOCIATED_WITH_CATEGORY.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.message = action.payload.message;
      state.selectedCategoryProducts = action.payload.productList;
    });
    // ! GET_ALL_PRODUCTS
    builder.addCase(GET_ALL_PRODUCTS.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(GET_ALL_PRODUCTS.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.message = action.payload;
    });
    builder.addCase(GET_ALL_PRODUCTS.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.message = action.payload.message;
      state.productList = action.payload.productList;
    });
    // ! UPDATE_PRODUCT_FEATURE_VISIBILITY
    builder.addCase(UPDATE_PRODUCT_FEATURE_VISIBILITY.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(UPDATE_PRODUCT_FEATURE_VISIBILITY.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.message = action.payload;
    });
    builder.addCase(UPDATE_PRODUCT_FEATURE_VISIBILITY.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.message = action.payload.message;
      state.productList = action.payload.productList;
    });
    // ! GET_PRODUCT_DETAILS
    builder.addCase(GET_PRODUCT_DETAILS.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(GET_PRODUCT_DETAILS.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.message = action.payload;
    });
    builder.addCase(GET_PRODUCT_DETAILS.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.message = action.payload.message;
      state.selectedProduct = action.payload.product;
    });
    // ! CREATE_NEW_PRODUCT
    builder.addCase(CREATE_NEW_PRODUCT.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(CREATE_NEW_PRODUCT.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.message = action.payload;
    });
    builder.addCase(CREATE_NEW_PRODUCT.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.message = action.payload.message;
      toast.success("Product was added to the catalog successfully.");
    });
    // >> getAllStoreOrders
    builder.addCase(DTA.getAllStoreOrders.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(DTA.getAllStoreOrders.rejected, (state, action) => {
      $rejectionHandler(state, action);
    });
    builder.addCase(DTA.getAllStoreOrders.fulfilled, (state, action) => {
      $fulfilledHandler(state, action);
      state.orderList = action.payload.orderList;
    });
    // >> getOrderDetails
    builder.addCase(DTA.getOrderDetails.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(DTA.getOrderDetails.rejected, (state, action) => {
      $rejectionHandler(state, action);
    });
    builder.addCase(DTA.getOrderDetails.fulfilled, (state, action) => {
      $fulfilledHandler(state, action);
      state.selectedOrder = action.payload.order;
    });
    // >> updateOrderState
    builder.addCase(DTA.updateOrderState.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(DTA.updateOrderState.rejected, (state, action) => {
      $rejectionHandler(state, action);
    });
    builder.addCase(DTA.updateOrderState.fulfilled, (state, action) => {
      $fulfilledHandler(state, action);
      state.selectedOrder = action.payload.order;
    });
    // >> getAllStoreUsers
    builder.addCase(DTA.getAllStoreUsers.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(DTA.getAllStoreUsers.rejected, (state, action) => {
      $rejectionHandler(state, action);
    });
    builder.addCase(DTA.getAllStoreUsers.fulfilled, (state, action) => {
      $fulfilledHandler(state, action);
      state.userList = action.payload.userList;
    });
    // >> getOrdersStats
    builder.addCase(DTA.getOrdersStats.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(DTA.getOrdersStats.rejected, (state, action) => {
      $rejectionHandler(state, action);
    });
    builder.addCase(DTA.getOrdersStats.fulfilled, (state, action) => {
      $fulfilledHandler(state, action);
      state.stats.paymentMethod = action.payload.paymentMethodStat;
    });
  },
});

export const { RESET_DASHBOARD, segregateOrderType } = dashboardSlice.actions;

export default dashboardSlice.reducer;
