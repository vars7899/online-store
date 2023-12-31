import { Button, Divider } from "@chakra-ui/react";
import { PaymentElement } from "@stripe/react-stripe-js";

export const CardDetails = ({ className, editOnClick }) => {
  return (
    <div className={className}>
      <div className="flex items-center justify-between mx-4">
        <p>Payment Details</p>
        <Button variant={"link"} colorScheme="accent" size={"sm"} onClick={editOnClick}>
          Edit
        </Button>
      </div>
      <Divider my={2} />
      <div className="px-4">
        <PaymentElement id={"payment-element"} options={{ layout: "auto" }} />
      </div>
    </div>
  );
};
