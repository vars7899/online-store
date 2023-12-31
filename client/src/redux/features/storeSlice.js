import { createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import * as storeActions from "../thunkActions/storeActions";

const initialState = {
  isLoading: false,
  isSuccess: false,
  isError: false,
  message: null,
  productList: [],
  categoryList: [],
  selectedProduct: null,
  cart: [],
  cartCount: 0,
  cartSubtotal: 0,
  wishlist: [],
  shippingAddressList: [],
  defaultShippingAddress: null,
  chargesPercentage: {
    convenienceFeesPercentage: 0,
    pstPercentage: 0,
    gstPercentage: 0,
  },
};

// Handle Error
const errorHandler = (state, action) => {
  state.isLoading = false;
  state.isError = true;
  state.message = action.payload;
};

// Handle Fulfilled
const fulfilledHandler = (state, action) => {
  state.isLoading = false;
  state.isSuccess = true;
  state.message = action.payload.message;
};

const storeSlice = createSlice({
  name: "store",
  initialState,
  reducers: {
    RESET_STORE(state) {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.message = null;
    },
    getCartSubtotal(state) {
      if (!state.cart.length) state.cartSubtotal = 0;
      else {
        state.cartSubtotal = state.cart.reduce((subtotal, cartItem) => {
          const totalItemPrice = cartItem.product.price * cartItem.qty;
          return subtotal + totalItemPrice;
        }, 0);
      }
    },
  },
  extraReducers: (builder) => {
    // ! GET_ALL_STORE_PRODUCTS
    builder.addCase(storeActions.GET_ALL_STORE_PRODUCTS.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(storeActions.GET_ALL_STORE_PRODUCTS.rejected, (state, action) => {
      errorHandler(state, action);
    });
    builder.addCase(storeActions.GET_ALL_STORE_PRODUCTS.fulfilled, (state, action) => {
      fulfilledHandler(state, action);
      state.productList = action.payload.productList;
    });
    // ! GET_ALL_STORE_PRODUCT_CATEGORIES
    builder.addCase(storeActions.GET_ALL_STORE_PRODUCT_CATEGORIES.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(storeActions.GET_ALL_STORE_PRODUCT_CATEGORIES.rejected, (state, action) => {
      errorHandler(state, action);
      state.categoryList = [];
    });
    builder.addCase(storeActions.GET_ALL_STORE_PRODUCT_CATEGORIES.fulfilled, (state, action) => {
      fulfilledHandler(state, action);
      state.categoryList = action.payload.categoryList;
    });
    // ! GET_STORE_PRODUCT_DETAILS
    builder.addCase(storeActions.GET_STORE_PRODUCT_DETAILS.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(storeActions.GET_STORE_PRODUCT_DETAILS.rejected, (state, action) => {
      errorHandler(state, action);
    });
    builder.addCase(storeActions.GET_STORE_PRODUCT_DETAILS.fulfilled, (state, action) => {
      fulfilledHandler(state, action);
      state.selectedProduct = action.payload.product;
    });
    // ! ADD_PRODUCT_TO_USER_CART
    builder.addCase(storeActions.ADD_PRODUCT_TO_USER_CART.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(storeActions.ADD_PRODUCT_TO_USER_CART.rejected, (state, action) => {
      errorHandler(state, action);
    });
    builder.addCase(storeActions.ADD_PRODUCT_TO_USER_CART.fulfilled, (state, action) => {
      fulfilledHandler(state, action);
      state.cart = action.payload.cart;
      state.cartCount = action.payload.cart ? action.payload.cart.length : 0;
    });
    // ! UPDATE_CART_ITEM_QTY
    builder.addCase(storeActions.UPDATE_CART_ITEM_QTY.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(storeActions.UPDATE_CART_ITEM_QTY.rejected, (state, action) => {
      errorHandler(state, action);
    });
    builder.addCase(storeActions.UPDATE_CART_ITEM_QTY.fulfilled, (state, action) => {
      fulfilledHandler(state, action);
      state.cart = action.payload.cart;
      state.cartCount = action.payload.cart ? action.payload.cart.length : 0;
    });
    // ! REMOVE_PRODUCT_FROM_USER_CART
    builder.addCase(storeActions.REMOVE_PRODUCT_FROM_USER_CART.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(storeActions.REMOVE_PRODUCT_FROM_USER_CART.rejected, (state, action) => {
      errorHandler(state, action);
    });
    builder.addCase(storeActions.REMOVE_PRODUCT_FROM_USER_CART.fulfilled, (state, action) => {
      fulfilledHandler(state, action);
      state.cart = action.payload.cart;
      state.cartCount = action.payload.cart ? action.payload.cart.length : 0;
    });
    // >> clearUserCart
    builder.addCase(storeActions.clearUserCart.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(storeActions.clearUserCart.rejected, (state, action) => {
      errorHandler(state, action);
    });
    builder.addCase(storeActions.clearUserCart.fulfilled, (state, action) => {
      fulfilledHandler(state, action);
      state.cart = action.payload.cart;
      state.cartCount = action.payload.cart ? action.payload.cart.length : 0;
    });
    // ! ADD_PRODUCT_TO_USER_WISHLIST
    builder.addCase(storeActions.ADD_PRODUCT_TO_USER_WISHLIST.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(storeActions.ADD_PRODUCT_TO_USER_WISHLIST.rejected, (state, action) => {
      errorHandler(state, action);
    });
    builder.addCase(storeActions.ADD_PRODUCT_TO_USER_WISHLIST.fulfilled, (state, action) => {
      fulfilledHandler(state, action);
      state.wishlist = action.payload.wishlist;
    });
    // ! REMOVE_PRODUCT_FROM_USER_WISHLIST
    builder.addCase(storeActions.REMOVE_PRODUCT_FROM_USER_WISHLIST.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(storeActions.REMOVE_PRODUCT_FROM_USER_WISHLIST.rejected, (state, action) => {
      errorHandler(state, action);
    });
    builder.addCase(storeActions.REMOVE_PRODUCT_FROM_USER_WISHLIST.fulfilled, (state, action) => {
      fulfilledHandler(state, action);
      state.wishlist = action.payload.wishlist;
    });
    // ! GET_USER_CART_DETAILS
    builder.addCase(storeActions.GET_USER_CART_DETAILS.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(storeActions.GET_USER_CART_DETAILS.rejected, (state, action) => {
      errorHandler(state, action);
    });
    builder.addCase(storeActions.GET_USER_CART_DETAILS.fulfilled, (state, action) => {
      fulfilledHandler(state, action);
      state.cart = action.payload.cart;
      state.cartCount = action.payload.cart ? action.payload.cart.length : 0;
    });
    // ! GET_USER_WISHLIST_DETAILS
    builder.addCase(storeActions.GET_USER_WISHLIST_DETAILS.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(storeActions.GET_USER_WISHLIST_DETAILS.rejected, (state, action) => {
      errorHandler(state, action);
    });
    builder.addCase(storeActions.GET_USER_WISHLIST_DETAILS.fulfilled, (state, action) => {
      fulfilledHandler(state, action);
      state.wishlist = action.payload.wishlist;
    });
    // ! GET_ALL_SHIPPING_ADDRESS
    builder.addCase(storeActions.GET_ALL_SHIPPING_ADDRESS.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(storeActions.GET_ALL_SHIPPING_ADDRESS.rejected, (state, action) => {
      errorHandler(state, action);
    });
    builder.addCase(storeActions.GET_ALL_SHIPPING_ADDRESS.fulfilled, (state, action) => {
      fulfilledHandler(state, action);
      state.shippingAddressList = action.payload.shippingAddress;
      state.defaultShippingAddress = action.payload.defaultShippingAddress;
    });
    // ! CREATE_NEW_SHIPPING_ADDRESS
    builder.addCase(storeActions.CREATE_NEW_SHIPPING_ADDRESS.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(storeActions.CREATE_NEW_SHIPPING_ADDRESS.rejected, (state, action) => {
      errorHandler(state, action);
    });
    builder.addCase(storeActions.CREATE_NEW_SHIPPING_ADDRESS.fulfilled, (state, action) => {
      fulfilledHandler(state, action);
      state.shippingAddressList = action.payload.shippingAddress;
      state.defaultShippingAddress = action.payload.defaultShippingAddress;
      toast.success("New shipping address added to the store");
    });
    // ! UPDATE_DEFAULT_SHIPPING_ADDRESS
    builder.addCase(storeActions.UPDATE_DEFAULT_SHIPPING_ADDRESS.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(storeActions.UPDATE_DEFAULT_SHIPPING_ADDRESS.rejected, (state, action) => {
      errorHandler(state, action);
    });
    builder.addCase(storeActions.UPDATE_DEFAULT_SHIPPING_ADDRESS.fulfilled, (state, action) => {
      fulfilledHandler(state, action);
      state.shippingAddressList = action.payload.shippingAddress;
      state.defaultShippingAddress = action.payload.defaultShippingAddress;
      toast.success("Default shipping address was updated");
    });
    // ! DELETE_SHIPPING_ADDRESS
    builder.addCase(storeActions.DELETE_SHIPPING_ADDRESS.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(storeActions.DELETE_SHIPPING_ADDRESS.rejected, (state, action) => {
      errorHandler(state, action);
    });
    builder.addCase(storeActions.DELETE_SHIPPING_ADDRESS.fulfilled, (state, action) => {
      fulfilledHandler(state, action);
      state.shippingAddressList = action.payload.shippingAddress;
      state.defaultShippingAddress = action.payload.defaultShippingAddress;
      toast.success("Shipping address was removed permanently from records");
    });
    // ! UPDATE_SHIPPING_ADDRESS
    builder.addCase(storeActions.UPDATE_SHIPPING_ADDRESS.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(storeActions.UPDATE_SHIPPING_ADDRESS.rejected, (state, action) => {
      errorHandler(state, action);
    });
    builder.addCase(storeActions.UPDATE_SHIPPING_ADDRESS.fulfilled, (state, action) => {
      fulfilledHandler(state, action);
      state.shippingAddressList = action.payload.shippingAddress;
      state.defaultShippingAddress = action.payload.defaultShippingAddress;
      toast.success("Shipping address was updated");
    });
    // >> getStoreChargesPercentage
    builder.addCase(storeActions.getStoreChargesPercentage.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(storeActions.getStoreChargesPercentage.rejected, (state, action) => {
      errorHandler(state, action);
    });
    builder.addCase(storeActions.getStoreChargesPercentage.fulfilled, (state, action) => {
      fulfilledHandler(state, action);
      state.chargesPercentage.convenienceFeesPercentage = parseFloat(
        action.payload.percentage.convenienceFeesPercentage
      );
      state.chargesPercentage.gstPercentage = parseFloat(action.payload.percentage.gstPercentage);
      state.chargesPercentage.pstPercentage = parseFloat(action.payload.percentage.pstPercentage);
    });
    // >> createProductReview
    builder.addCase(storeActions.createProductReview.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(storeActions.createProductReview.rejected, (state, action) => {
      errorHandler(state, action);
    });
    builder.addCase(storeActions.createProductReview.fulfilled, (state, action) => {
      fulfilledHandler(state, action);
      toast.success(action.payload.message);
    });
  },
});

export const { RESET_STORE, getCartSubtotal } = storeSlice.actions;

export default storeSlice.reducer;
