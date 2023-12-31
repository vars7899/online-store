import { Divider, Image } from "@chakra-ui/react";
import * as Components from "..";
import CashImage from "../../assets/cash.png";
import CreditCardImage from "../../assets/creditCard.png";
import WalletImage from "../../assets/wallet.png";

const paymentOptions = [
  {
    title: "cash on delivery",
    icon: CashImage,
  },
  {
    title: "credit card",
    icon: CreditCardImage,
  },
  {
    title: "wallet",
    icon: WalletImage,
  },
];

export const PaymentMethodForm = ({ formData, $setter }) => {
  return (
    <div>
      <Components.Order.OrderInformationContainerHeading title={"Payment Type"} />
      <Divider my={4} />
      <div className="grid grid-cols-4 gap-4">
        {paymentOptions.map((opt, index) => (
          <Components.Default.SelectionBox
            key={`payment-opt-${index}`}
            selected={opt.title === formData.paymentMethod}
            onClick={() => $setter((prev) => ({ ...prev, paymentMethod: opt.title }))}
          >
            <div className="flex flex-col items-center justify-center">
              <Image src={opt.icon} alt={opt.title} boxSize={70} objectFit={"cover"} />
              <p className="mt-3 capitalize">{opt.title}</p>
            </div>
          </Components.Default.SelectionBox>
        ))}
      </div>
    </div>
  );
};
