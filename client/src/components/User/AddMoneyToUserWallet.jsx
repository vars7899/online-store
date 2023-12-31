import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Button,
  Divider,
} from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { paymentThunkActions } from "../../redux/thunkActions";
import { Elements, useElements, useStripe, PaymentElement } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export const AddMoneyToUserWallet = ({ children, amount }) => {
  const dispatch = useDispatch();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const { publicKey, clientSecret, isError, message } = useSelector((state) => state.payment);

  useEffect(() => {
    if (publicKey) {
      dispatch(
        paymentThunkActions.createNewPaymentIntentForWallet({
          amount,
        })
      );
    }
  }, [publicKey, dispatch, amount]);

  return (
    <>
      <span
        onClick={() =>
          amount && amount >= 1
            ? onOpen()
            : toast.warn("Invalid amount, Please enter a valid amount to add to store wallet")
        }
      >
        {children}
      </span>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add Store Credits</ModalHeader>
          <ModalCloseButton />
          <Divider />
          {amount && (
            <ModalBody>
              <div className="bg-blue-50 flex items-center justify-center rounded-xl p-4 mb-6">
                <p>
                  <span className="text-4xl font-semibold">{Number(amount).toFixed(2)}</span>
                  <span className="text-xs ml-1">CAD</span>
                </p>
              </div>

              {publicKey && clientSecret ? (
                <Elements stripe={loadStripe(publicKey)} key={clientSecret} options={{ clientSecret: clientSecret }}>
                  <WalletCheckoutForm onClose={onClose} amount={amount} clientSecret={clientSecret} />
                </Elements>
              ) : (
                <div>Loading...</div>
              )}
              <p className="mb-6 text-gray-500">
                Store credits cannot be exchanged for original payment. If you still have any question please call
                Eccent customer service. By proceeding and paying you agree to the terms and condition of the Eccent
                components.
              </p>
            </ModalBody>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

const WalletCheckoutForm = ({ onClose, amount, clientSecret }) => {
  const stripe = useStripe();
  const elements = useElements();
  const dispatch = useDispatch();

  const [stripeIsLoading, setStripeIsLoading] = useState(false);

  const { user } = useSelector((state) => state.auth);

  const $addMoneyToWallet = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) return;
    // setStripeIsLoading(true);

    try {
      let paymentIntent = clientSecret.split("_secret")[0];
      // Create New Transaction
      dispatch(paymentThunkActions.createNewTransactionRecord({ amount, paymentId: paymentIntent }));

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
          toast.error(error.message);
          return;
        } else {
          toast.error("An unexpected error occurred.", error);
        }
      }
    } catch (error) {
      toast.error("An unexpected error occurred. f", error);
    } finally {
      setStripeIsLoading(false);
    }
  };
  return (
    <div>
      <PaymentElement id={"payment-element"} options={{ layout: "auto" }} />
      <div className="flex flex-col my-4">
        <Button isLoading={stripeIsLoading} onClick={$addMoneyToWallet} colorScheme="blue">
          Proceed & Pay
        </Button>
        <Button variant={"outline"} colorScheme="gray" mt={3} onClick={onClose}>
          Cancel
        </Button>
      </div>
    </div>
  );
};
