import { Elements } from "@stripe/react-stripe-js";
import { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadStripe } from "@stripe/stripe-js";
import { paymentThunkActions } from "../../redux/thunkActions";

let alreadyFired = false;

export const StripeContextChildren = ({ children }) => {
  const dispatch = useDispatch();
  const { publicKey } = useSelector((state) => state.payment);
  const { newOrderDetails } = useSelector((state) => state.order);
  const { clientSecret } = useSelector((state) => state.payment);
  const stripePromise = useMemo(() => loadStripe(publicKey), []);

  // >> Create Stripe Payment Intent when page mount and on formData change
  useEffect(() => {
    if (newOrderDetails && !alreadyFired) {
      dispatch(
        paymentThunkActions.CREATE_NEW_PAYMENT_INTENT({
          orderItems: newOrderDetails.orderItems,
          shippingServiceType: "express",
        })
      );
      alreadyFired = true;
    }
  }, []);

  return (
    <>
      {clientSecret && publicKey ? (
        <Elements
          key={clientSecret}
          stripe={stripePromise}
          options={{
            clientSecret,
            appearance: {
              theme: "flat",
            },
          }}
        >
          {children}
        </Elements>
      ) : (
        <div>Loading.... ...</div>
      )}
    </>
  );
};
