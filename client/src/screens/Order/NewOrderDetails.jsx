import { Components, Hooks, Layouts } from "../../global";
import { storeThunkActions } from "../../redux/thunkActions";
import { Button } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { IconChevronLeft, IconChevronRight } from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import * as orderActions from "../../redux/features/orderSlice";
import { getUserDetails } from "../../redux/features/authSlice";

const defaultOrderDetails = {
  shippingAddressId: "",
  billingAddressId: "",
  shippingMethod: "delivery",
  shippingCharges: 0,
  shippingServiceType: "",
  estimatedDeliveryDate: "",
  orderItems: "",
  paymentMethod: "cash on delivery",
  total: 0,
  paymentInfo: {
    paymentDate: "",
    paymentStatus: "",
    paymentAmount: "",
    paymentId: "",
  },
};
export const NewOrderDetails = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { shippingAddressList, defaultShippingAddress, cart } = useSelector((state) => state.store);
  const { newOrderDetails } = useSelector((state) => state.order);
  const [orderDetails, setOrderDetails] = useState(newOrderDetails.isFilled ? newOrderDetails : defaultOrderDetails);

  const stepDefaultProps = {
    formData: orderDetails,
    $setter: setOrderDetails,
  };

  const stepInformationArray = [
    {
      title: "Delivery Details",
      element: <Components.Order.ShippingMethodAndDateForm {...stepDefaultProps} />,
    },
    {
      title: "Shipping Details",
      element: (
        <Components.Order.ShippingAddressSelectorForm
          {...stepDefaultProps}
          shippingAddressList={shippingAddressList}
          defaultShippingAddress={defaultShippingAddress}
        />
      ),
    },
    {
      title: "Billing Details",
      element: (
        <Components.Order.BillingAddressSelectorForm {...stepDefaultProps} shippingAddressList={shippingAddressList} />
      ),
    },
    {
      title: "Payment Details",
      element: <Components.Order.PaymentMethodForm {...stepDefaultProps} />,
    },
  ];

  // >> Multi step form hook
  const { currentStepElement, $nextStep, $prevStep, $moveTo, currentStepIndex, totalSteps } = Hooks.useMultiStepForm(
    stepInformationArray.map((opt) => opt.element)
  );

  // >> Function to move user to prev step of previous page
  const $prevStepHandler = () => {
    if (currentStepIndex === 0) {
      dispatch(orderActions.RESET_NEW_ORDER_DETAILS());
      navigate("/user/cart", { replace: true });
    } else $prevStep();
  };

  // >> Function to move user to next page or right page
  const $nextStepHandler = () => {
    if (currentStepIndex === totalSteps - 1) {
      dispatch(orderActions.UPDATE_NEW_ORDER_DETAILS(orderDetails)); // >> Save all new order details
      navigate("/order/review-order", { replace: true });
    } else {
      // >> Form Data validation
      $nextStep();
    }
  };

  // >> Initiate Page data
  useEffect(() => {
    dispatch(storeThunkActions.GET_ALL_SHIPPING_ADDRESS());
    dispatch(getUserDetails());
  }, []);

  useEffect(() => {
    if (!cart.length) {
      navigate("/user/cart", { replace: true });
    }
    setOrderDetails((prev) => ({ ...prev, orderItems: cart }));
  }, [cart]);

  useEffect(() => {
    if (newOrderDetails.isFilled) {
      setOrderDetails(newOrderDetails);
    }
  }, [newOrderDetails.filled]);

  return (
    <Layouts.Basic
      bottomBar={
        <BottomBarContent
          $prevStepHandler={$prevStepHandler}
          $nextStepHandler={$nextStepHandler}
          currentStepIndex={currentStepIndex}
          totalSteps={totalSteps}
          stepInformationArray={stepInformationArray}
        />
      }
    >
      <div className="my-5 relative flex-1">
        <Components.Default.ProcessProgressStep
          currentStep={currentStepIndex}
          stepInformationArray={stepInformationArray}
        />
        <div className="grid grid-cols-[1fr,_400px] gap-8 py-6 min-h-[calc(100vh-150px)]">
          <div className="flex flex-col justify-between h-[100%]">{currentStepElement}</div>
          <Components.Cart.CartSummary
            title={"Order Review"}
            displayProceed={false}
            shippingCharges={orderDetails.shippingCharges}
            displayOtherOrderInfo={true}
            orderDetails={orderDetails}
          />
        </div>
      </div>
    </Layouts.Basic>
  );
};

const BottomBarContent = ({
  $prevStepHandler,
  $nextStepHandler,
  currentStepIndex,
  totalSteps,
  stepInformationArray,
}) => {
  return (
    <div className="flex items-center justify-between">
      <Button onClick={$prevStepHandler} leftIcon={<IconChevronLeft />} variant={"outline"}>
        Back
      </Button>
      <Button onClick={$nextStepHandler} rightIcon={<IconChevronRight />} variant={"outline"} colorScheme="accent">
        {currentStepIndex < totalSteps - 1 ? stepInformationArray[currentStepIndex].title : "Confirm & Pay"}
      </Button>
    </div>
  );
};
