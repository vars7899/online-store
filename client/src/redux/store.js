import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/authSlice";
import dashboardReducer from "./features/dashboardSlice";
import storeReducer from "./features/storeSlice";
import orderReducer from "./features/orderSlice";
import paymentReducer from "./features/paymentSlice";
import appReducer from "./features/appSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    dashboard: dashboardReducer,
    store: storeReducer,
    order: orderReducer,
    payment: paymentReducer,
    app: appReducer,
  },
});

export default store;
