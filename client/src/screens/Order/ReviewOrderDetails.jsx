import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useDispatch, useSelector } from "react-redux";
import { Components } from "../../global";
import { useEffect } from "react";
import { paymentThunkActions, storeThunkActions } from "../../redux/thunkActions";
import * as paymentAction from "../../redux/features/paymentSlice";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export const ReviewOrderDetails = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { publicKey, clientSecret, isError, message } = useSelector((state) => state.payment);
  const { newOrderDetails } = useSelector((state) => state.order);

  useEffect(() => {
    if (publicKey && newOrderDetails.isFilled && newOrderDetails.orderItems) {
      dispatch(
        paymentThunkActions.CREATE_NEW_PAYMENT_INTENT({
          orderItems: newOrderDetails.orderItems,
          shippingServiceType: newOrderDetails.shippingServiceType,
        })
      );
    }
  }, [publicKey, newOrderDetails, dispatch]);

  useEffect(() => {
    if (isError) {
      toast.error(message);
      dispatch(paymentAction.resetPayment());
      navigate("/user/cart", { replace: true });
    }
  }, [isError, message, dispatch]);

  useEffect(() => {
    if (newOrderDetails && !newOrderDetails.isFilled) navigate("/user/cart");
    dispatch(storeThunkActions.GET_ALL_SHIPPING_ADDRESS());
  }, []);

  return (
    <>
      {publicKey && clientSecret ? (
        <Elements stripe={loadStripe(publicKey)} key={clientSecret} options={{ clientSecret: clientSecret }}>
          <Components.Order.ConfirmAndPayForm />
        </Elements>
      ) : (
        <div>Loading...</div>
      )}
    </>
  );
};
