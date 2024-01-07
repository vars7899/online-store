import { useElements, useStripe, PaymentElement } from "@stripe/react-stripe-js";
import { useDispatch, useSelector } from "react-redux";
import { Components, Layouts } from "../../global";
import { Button, Divider } from "@chakra-ui/react";
import { IconArrowRight } from "@tabler/icons-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { DateTime } from "luxon";
import toast from "react-hot-toast";
import { orderThunkActions, paymentThunkActions, storeThunkActions } from "../../redux/thunkActions";
import { RESET_NEW_ORDER_DETAILS, RESET_ORDER } from "../../redux/features/orderSlice";

export const ConfirmAndPayForm = () => {
  // >> Router
  const navigate = useNavigate();
  // >> Stripe
  const stripe = useStripe();
  const elements = useElements();
  const [message, setMessage] = useState();
  const [stripeIsLoading, setStripeIsLoading] = useState(false);
  // >> Redux
  const dispatch = useDispatch();
  const {
    newOrderDetails,
    isLoading,
    selectedOrder,
    isError,
    message: orderMessage,
    isSuccess,
  } = useSelector((state) => state.order);
  const { user } = useSelector((state) => state.auth);
  const { cart, shippingAddressList } = useSelector((state) => state.store); // >> update this to order items
  const { clientSecret } = useSelector((state) => state.payment);
  const shippingAddress = shippingAddressList.find((address) => address._id === newOrderDetails.shippingAddressId);
  const billingAddress = shippingAddressList.find((address) => address._id === newOrderDetails.billingAddressId);

  useEffect(() => {
    if (isError) {
      toast.error(orderMessage);
      navigate("/user/cart", { replace: true });
    }
    if (isSuccess) {
      dispatch(storeThunkActions.clearUserCart());
      dispatch(RESET_NEW_ORDER_DETAILS());
      navigate("/order/order-confirmation/" + selectedOrder._id, { replace: true });
    }
    dispatch(RESET_ORDER());
  }, [isError, orderMessage, dispatch]);

  const $createNewOrderHandler = async (e) => {
    e.preventDefault();

    if (!newOrderDetails.orderItems.length) {
      return toast.error("Invalid order request, missing products to create order");
    }
    if (!stripe || !elements) return;

    setStripeIsLoading(true);

    try {
      let paymentIntent = clientSecret.split("_secret")[0];
      dispatch(orderThunkActions.createNewOrder({ ...newOrderDetails, paymentIntent: paymentIntent }));
      // >> Only use stripe for credit card orders
      if (newOrderDetails.paymentMethod === "credit card") {
        // >> Also define the order id to later on change the order payment status
        const { error } = await stripe.confirmPayment({
          elements,
          confirmParams: {
            return_url: "http://localhost:5173/order/order-confirmation",
            receipt_email: user?.email,
          },
          redirect: "if_required",
        });
        if (error) {
          if (error.type === "card_error" || error.type === "validation_error") {
            setMessage(error.message);
            toast.error(error.message);
            return;
          } else {
            setMessage(error.message);
            toast.error("An unexpected error occurred.");
          }
        }
      }
    } catch (error) {
      // Handle unexpected errors
      setMessage(error.message);
      toast.error(error);
    } finally {
      setStripeIsLoading(false);
    }
  };

  return (
    <Layouts.Minimal
      bottomBar={
        <BottomBarContent
          onClick={$createNewOrderHandler}
          newOrderDetails={newOrderDetails}
          isLoading={stripeIsLoading || isLoading || isError}
        />
      }
    >
      <div className="grid grid-cols-3 gap-4 h-full flex-1">
        <div className="py-6 px-8 shadow-md">
          <SectionHeader
            className={"mb-8"}
            title={"Order Items"}
            desc={"Please confirm all the order items details in order."}
          />
          <OrderItemsDetails cart={cart} title={"Product List"} editOnClick={() => navigate("/user/cart")} />
        </div>
        <div className="py-6 px-8 shadow-md">
          <SectionHeader
            className={"mb-8"}
            title={"Order Preferences"}
            desc={"Please confirm all the shipping details in order."}
          />
          <ShippingDetails
            title={"Selected Shipping Preference"}
            orderDetails={newOrderDetails}
            className={"mt-2"}
            editOnClick={() => navigate("/order/new-order")}
          />
          <Divider mt={8} />
          <AddressDetailCard
            title={"Selected Shipping Address"}
            address={shippingAddress}
            className={"mt-2"}
            editOnClick={() => navigate("/order/new-order")}
          />
          <Divider mt={8} />
          <AddressDetailCard
            title={"Selected Billing Address"}
            address={billingAddress}
            className={"mt-2"}
            editOnClick={() => navigate("/order/new-order")}
          />
        </div>
        <div className="py-6 px-8 shadow-md">
          <SectionHeader
            className={"mb-8"}
            title={"Payment Details"}
            desc={" Please provide your payment details in order to complete your purchase."}
          />
          {newOrderDetails.paymentMethod === "credit card" ? (
            <Components.Order.CardDetails
              PaymentElement={PaymentElement}
              editOnClick={() => navigate("/order/new-order")}
            />
          ) : newOrderDetails.paymentMethod === "cash on delivery" ? (
            <div>
              <Components.Default.SelectionBox selected={true}>
                <p className="capitalize">{newOrderDetails.paymentMethod}</p>
              </Components.Default.SelectionBox>
            </div>
          ) : (
            <Components.Default.SelectionBox selected={true}>
              <div className="flex items-center justify-between">
                <p className="capitalize">{newOrderDetails.paymentMethod}</p>
                <p className="capitalize">{Number(user.wallet.balance).toFixed(2)}</p>
              </div>
            </Components.Default.SelectionBox>
          )}
        </div>
      </div>
    </Layouts.Minimal>
  );
};

const SectionHeader = ({ className, title, desc }) => {
  return (
    <div className={className}>
      <div className={"px-4"}>
        <p className="text-lg">{title}</p>
        <p className="text-gray-500 text-xs">{desc}</p>
      </div>
      <Divider my={2} />
    </div>
  );
};

const BottomBarContent = ({ isLoading, onClick, newOrderDetails }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  return (
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm">Total</p>
        <p>{newOrderDetails.total.toFixed(2)} CAD</p>
      </div>
      <div>
        <Button
          variant={"outline"}
          mr={4}
          onClick={() => {
            dispatch(RESET_NEW_ORDER_DETAILS());
            navigate("/user/cart");
          }}
        >
          Cancel
        </Button>

        <Button
          rightIcon={<IconArrowRight strokeWidth={1.5} className="animate-pulse" />}
          colorScheme="accent"
          onClick={onClick}
          isLoading={isLoading}
        >
          Confirm & Pay
        </Button>
      </div>
    </div>
  );
};

const AddressDetailCard = ({ title, address, className, editOnClick }) => {
  return (
    <div className={className}>
      <div className="flex items-center justify-between mx-4">
        <p>{title}</p>
        <Button variant={"link"} colorScheme="accent" size={"sm"} onClick={editOnClick}>
          Edit
        </Button>
      </div>
      <Divider my={2} />
      <div className="px-4">
        <Components.Default.DetailsPair title={"address name"} value={address?.name} />
        <Components.Default.DetailsPair title={"Street Address"} value={address?.street} />
        <Components.Default.DetailsPair
          title={"Location Region"}
          value={address?.city + ", " + address?.state + ", " + address?.country}
          S
        />
        <Components.Default.DetailsPair title={"Postal Code"} value={address?.postalCode} />
        <Components.Default.DetailsPair title={"Contact Information"} value={address?.contactInformation} />
      </div>
    </div>
  );
};

const ShippingDetails = ({ title, orderDetails, className, editOnClick }) => {
  return (
    <div className={className}>
      <div className="flex items-center justify-between mx-4">
        <p>{title}</p>
        <Button variant={"link"} colorScheme="accent" size={"sm"} onClick={editOnClick}>
          Edit
        </Button>
      </div>
      <Divider my={2} />
      <div className="px-4">
        <Components.Default.DetailsPair title={"Shipping Method"} value={orderDetails.shippingMethod} />
        <Components.Default.DetailsPair title={"Shipping Service Type"} value={orderDetails.shippingServiceType} />
        <Components.Default.DetailsPair
          title={"Estimated Delivery Day"}
          value={DateTime.fromISO(orderDetails.estimatedDeliveryDate).toLocaleString(
            DateTime.DATETIME_MED_WITH_WEEKDAY
          )}
        />
      </div>
    </div>
  );
};

const OrderItemsDetails = ({ cart, className, title, editOnClick }) => {
  return (
    <div className={className}>
      <div className="flex items-center justify-between mx-4">
        <p>{title}</p>
        <Button variant={"link"} colorScheme="accent" size={"sm"} onClick={editOnClick}>
          Edit
        </Button>
      </div>
      <Divider my={2} />
      <div className="px-4">
        {cart.map((cartItem, index) => (
          <Components.Default.DetailsPair
            key={`cart-item-${index}`}
            title={
              cartItem.product.name.length < 40 ? cartItem.product.name : cartItem.product.name.slice(0, 40) + "..."
            }
            value={cartItem.product.price + " x " + cartItem.qty}
          />
        ))}
      </div>
    </div>
  );
};
