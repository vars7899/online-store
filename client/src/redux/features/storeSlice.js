import { createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import { $pendingHandler, $rejectionHandler, $fulfilledHandler } from "../utils";
import { storeThunkActions as STA } from "../thunkActions";

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

const storeSlice = createSlice({
  name: "STORE",
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
    // << GET_ALL_STORE_PRODUCTS
    builder.addCase(STA.GET_ALL_STORE_PRODUCTS.pending, (state) => {
      $pendingHandler(state);
    });
    builder.addCase(STA.GET_ALL_STORE_PRODUCTS.rejected, (state, action) => {
      $rejectionHandler(state, action);
    });
    builder.addCase(STA.GET_ALL_STORE_PRODUCTS.fulfilled, (state, action) => {
      $fulfilledHandler(state, action);
      state.productList = action.payload.productList;
    });
    // << GET_ALL_STORE_PRODUCT_CATEGORIES
    builder.addCase(STA.GET_ALL_STORE_PRODUCT_CATEGORIES.pending, (state) => {
      $pendingHandler(state);
    });
    builder.addCase(STA.GET_ALL_STORE_PRODUCT_CATEGORIES.rejected, (state, action) => {
      $rejectionHandler(state, action);
      state.categoryList = [];
    });
    builder.addCase(STA.GET_ALL_STORE_PRODUCT_CATEGORIES.fulfilled, (state, action) => {
      $fulfilledHandler(state, action);
      state.categoryList = action.payload.categoryList;
    });
    // << GET_STORE_PRODUCT_DETAILS
    builder.addCase(STA.GET_STORE_PRODUCT_DETAILS.pending, (state) => {
      $pendingHandler(state);
    });
    builder.addCase(STA.GET_STORE_PRODUCT_DETAILS.rejected, (state, action) => {
      $rejectionHandler(state, action);
    });
    builder.addCase(STA.GET_STORE_PRODUCT_DETAILS.fulfilled, (state, action) => {
      $fulfilledHandler(state, action);
      state.selectedProduct = action.payload.product;
    });
    // << ADD_PRODUCT_TO_USER_CART
    builder.addCase(STA.ADD_PRODUCT_TO_USER_CART.pending, (state) => {
      $pendingHandler(state);
    });
    builder.addCase(STA.ADD_PRODUCT_TO_USER_CART.rejected, (state, action) => {
      $rejectionHandler(state, action);
    });
    builder.addCase(STA.ADD_PRODUCT_TO_USER_CART.fulfilled, (state, action) => {
      $fulfilledHandler(state, action);
      state.cart = action.payload.cart;
      state.cartCount = action.payload.cart ? action.payload.cart.length : 0;
    });
    // << UPDATE_CART_ITEM_QTY
    builder.addCase(STA.UPDATE_CART_ITEM_QTY.pending, (state) => {
      $pendingHandler(state);
    });
    builder.addCase(STA.UPDATE_CART_ITEM_QTY.rejected, (state, action) => {
      $rejectionHandler(state, action);
    });
    builder.addCase(STA.UPDATE_CART_ITEM_QTY.fulfilled, (state, action) => {
      $fulfilledHandler(state, action);
      state.cart = action.payload.cart;
      state.cartCount = action.payload.cart ? action.payload.cart.length : 0;
    });
    // << REMOVE_PRODUCT_FROM_USER_CART
    builder.addCase(STA.REMOVE_PRODUCT_FROM_USER_CART.pending, (state) => {
      $pendingHandler(state);
    });
    builder.addCase(STA.REMOVE_PRODUCT_FROM_USER_CART.rejected, (state, action) => {
      $rejectionHandler(state, action);
    });
    builder.addCase(STA.REMOVE_PRODUCT_FROM_USER_CART.fulfilled, (state, action) => {
      $fulfilledHandler(state, action);
      state.cart = action.payload.cart;
      state.cartCount = action.payload.cart ? action.payload.cart.length : 0;
    });
    // << CLEAR_USER_CART
    builder.addCase(STA.CLEAR_USER_CART.pending, (state) => {
      $pendingHandler(state);
    });
    builder.addCase(STA.CLEAR_USER_CART.rejected, (state, action) => {
      $rejectionHandler(state, action);
    });
    builder.addCase(STA.CLEAR_USER_CART.fulfilled, (state, action) => {
      $fulfilledHandler(state, action);
      state.cart = action.payload.cart;
      state.cartCount = action.payload.cart ? action.payload.cart.length : 0;
    });
    // << ADD_PRODUCT_TO_USER_WISHLIST
    builder.addCase(STA.ADD_PRODUCT_TO_USER_WISHLIST.pending, (state) => {
      $pendingHandler(state);
    });
    builder.addCase(STA.ADD_PRODUCT_TO_USER_WISHLIST.rejected, (state, action) => {
      $rejectionHandler(state, action);
    });
    builder.addCase(STA.ADD_PRODUCT_TO_USER_WISHLIST.fulfilled, (state, action) => {
      $fulfilledHandler(state, action);
      state.wishlist = action.payload.wishlist;
    });
    // << REMOVE_PRODUCT_FROM_USER_WISHLIST
    builder.addCase(STA.REMOVE_PRODUCT_FROM_USER_WISHLIST.pending, (state) => {
      $pendingHandler(state);
    });
    builder.addCase(STA.REMOVE_PRODUCT_FROM_USER_WISHLIST.rejected, (state, action) => {
      $rejectionHandler(state, action);
    });
    builder.addCase(STA.REMOVE_PRODUCT_FROM_USER_WISHLIST.fulfilled, (state, action) => {
      $fulfilledHandler(state, action);
      state.wishlist = action.payload.wishlist;
    });
    // << GET_USER_CART_DETAILS
    builder.addCase(STA.GET_USER_CART_DETAILS.pending, (state) => {
      $pendingHandler(state);
    });
    builder.addCase(STA.GET_USER_CART_DETAILS.rejected, (state, action) => {
      $rejectionHandler(state, action);
    });
    builder.addCase(STA.GET_USER_CART_DETAILS.fulfilled, (state, action) => {
      $fulfilledHandler(state, action);
      state.cart = action.payload.cart;
      state.cartCount = action.payload.cart ? action.payload.cart.length : 0;
    });
    // << GET_USER_WISHLIST_DETAILS
    builder.addCase(STA.GET_USER_WISHLIST_DETAILS.pending, (state) => {
      $pendingHandler(state);
    });
    builder.addCase(STA.GET_USER_WISHLIST_DETAILS.rejected, (state, action) => {
      $rejectionHandler(state, action);
    });
    builder.addCase(STA.GET_USER_WISHLIST_DETAILS.fulfilled, (state, action) => {
      $fulfilledHandler(state, action);
      state.wishlist = action.payload.wishlist;
    });
    // << GET_ALL_SHIPPING_ADDRESS
    builder.addCase(STA.GET_ALL_SHIPPING_ADDRESS.pending, (state) => {
      $pendingHandler(state);
    });
    builder.addCase(STA.GET_ALL_SHIPPING_ADDRESS.rejected, (state, action) => {
      $rejectionHandler(state, action);
    });
    builder.addCase(STA.GET_ALL_SHIPPING_ADDRESS.fulfilled, (state, action) => {
      $fulfilledHandler(state, action);
      state.shippingAddressList = action.payload.shippingAddress;
      state.defaultShippingAddress = action.payload.defaultShippingAddress;
    });
    // << CREATE_NEW_SHIPPING_ADDRESS
    builder.addCase(STA.CREATE_NEW_SHIPPING_ADDRESS.pending, (state) => {
      $pendingHandler(state);
    });
    builder.addCase(STA.CREATE_NEW_SHIPPING_ADDRESS.rejected, (state, action) => {
      $rejectionHandler(state, action);
    });
    builder.addCase(STA.CREATE_NEW_SHIPPING_ADDRESS.fulfilled, (state, action) => {
      $fulfilledHandler(state, action);
      state.shippingAddressList = action.payload.shippingAddress;
      state.defaultShippingAddress = action.payload.defaultShippingAddress;
      toast.success("New shipping address added to the store");
    });
    // << UPDATE_DEFAULT_SHIPPING_ADDRESS
    builder.addCase(STA.UPDATE_DEFAULT_SHIPPING_ADDRESS.pending, (state) => {
      $pendingHandler(state);
    });
    builder.addCase(STA.UPDATE_DEFAULT_SHIPPING_ADDRESS.rejected, (state, action) => {
      $rejectionHandler(state, action);
    });
    builder.addCase(STA.UPDATE_DEFAULT_SHIPPING_ADDRESS.fulfilled, (state, action) => {
      $fulfilledHandler(state, action);
      state.shippingAddressList = action.payload.shippingAddress;
      state.defaultShippingAddress = action.payload.defaultShippingAddress;
      toast.success("Default shipping address was updated");
    });
    // << DELETE_SHIPPING_ADDRESS
    builder.addCase(STA.DELETE_SHIPPING_ADDRESS.pending, (state) => {
      $pendingHandler(state);
    });
    builder.addCase(STA.DELETE_SHIPPING_ADDRESS.rejected, (state, action) => {
      $rejectionHandler(state, action);
    });
    builder.addCase(STA.DELETE_SHIPPING_ADDRESS.fulfilled, (state, action) => {
      $fulfilledHandler(state, action);
      state.shippingAddressList = action.payload.shippingAddress;
      state.defaultShippingAddress = action.payload.defaultShippingAddress;
      toast.success("Shipping address was removed permanently from records");
    });
    // << UPDATE_SHIPPING_ADDRESS
    builder.addCase(STA.UPDATE_SHIPPING_ADDRESS.pending, (state) => {
      $pendingHandler(state);
    });
    builder.addCase(STA.UPDATE_SHIPPING_ADDRESS.rejected, (state, action) => {
      $rejectionHandler(state, action);
    });
    builder.addCase(STA.UPDATE_SHIPPING_ADDRESS.fulfilled, (state, action) => {
      $fulfilledHandler(state, action);
      state.shippingAddressList = action.payload.shippingAddress;
      state.defaultShippingAddress = action.payload.defaultShippingAddress;
      toast.success("Shipping address was updated");
    });
    // << GET_STORE_CHARGES_PERCENTAGE
    builder.addCase(STA.GET_STORE_CHARGES_PERCENTAGE.pending, (state) => {
      $pendingHandler(state);
    });
    builder.addCase(STA.GET_STORE_CHARGES_PERCENTAGE.rejected, (state, action) => {
      $rejectionHandler(state, action);
    });
    builder.addCase(STA.GET_STORE_CHARGES_PERCENTAGE.fulfilled, (state, action) => {
      $fulfilledHandler(state, action);
      state.chargesPercentage.convenienceFeesPercentage = parseFloat(
        action.payload.percentage.convenienceFeesPercentage
      );
      state.chargesPercentage.gstPercentage = parseFloat(action.payload.percentage.gstPercentage);
      state.chargesPercentage.pstPercentage = parseFloat(action.payload.percentage.pstPercentage);
    });
    // << CREATE_PRODUCT_REVIEW
    builder.addCase(STA.CREATE_PRODUCT_REVIEW.pending, (state) => {
      $pendingHandler(state);
    });
    builder.addCase(STA.CREATE_PRODUCT_REVIEW.rejected, (state, action) => {
      $rejectionHandler(state, action);
    });
    builder.addCase(STA.CREATE_PRODUCT_REVIEW.fulfilled, (state, action) => {
      $fulfilledHandler(state, action);
      toast.success(action.payload.message);
    });
  },
});

export const { RESET_STORE, getCartSubtotal } = storeSlice.actions;

export default storeSlice.reducer;
