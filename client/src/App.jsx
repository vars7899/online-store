import { BrowserRouter as Router } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import * as authAction from "./redux/features/authSlice";
import * as storeThunkAction from "./redux/thunkActions/storeActions";
import * as storeAction from "./redux/features/storeSlice";
import { paymentThunkActions as PTA } from "./redux/thunkActions";
import { RenderRoutes } from "./RenderRoutes";
import { authThunkActions as ATA } from "./redux/thunkActions";

const App = () => {
  // For token
  axios.defaults.withCredentials = true;

  const dispatch = useDispatch();
  const authState = useSelector((state) => state.auth);
  const storeState = useSelector((state) => state.store);

  useEffect(() => {
    dispatch(ATA.CHECK_LOGIN_STATUS());
    // Remove these two from here
    dispatch(storeThunkAction.GET_USER_CART_DETAILS());
    dispatch(storeThunkAction.GET_USER_WISHLIST_DETAILS());
    dispatch(PTA.GET_STRIPE_PUBLIC_KEY());
  }, [dispatch]);

  // TODO --> giving double toast after adding these effect
  useEffect(() => {
    if (authState.isError) {
      toast.error(authState.message);
      dispatch(authAction.RESET_AUTH());
    }
    if (storeState.isError) {
      toast.error(storeState.message);
      dispatch(storeAction.RESET_STORE());
    }
  }, [dispatch, authState.isError, authState.message, storeState.isError, storeState.message]);

  return (
    <div className="font-poppins">
      <Router>
        <RenderRoutes />
        <Toaster />
      </Router>
    </div>
  );
};

export default App;
