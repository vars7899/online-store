import { Divider, Image } from "@chakra-ui/react";
import * as Components from "..";
import CashImage from "../../assets/cash.png";
import CreditCardImage from "../../assets/creditCard.png";
import WalletImage from "../../assets/wallet.png";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { Hooks } from "../../global";

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
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { shippingCharges } = formData;
  const { total } = Hooks.useOrderCharges({ shippingCharges });

  return (
    <div>
      <Components.Order.OrderInformationContainerHeading title={"Payment Type"} />
      <Divider my={4} />
      <div className="grid grid-cols-4 gap-4">
        {paymentOptions.map((opt, index) => (
          <Components.Default.SelectionBox
            key={`payment-opt-${index}`}
            selected={opt.title === formData.paymentMethod}
            onClick={() => {
              if (opt.title === "wallet" && total > user.wallet.balance) {
                return toast.error("Insufficient Balance, Please try other payment method");
              }
              $setter((prev) => ({ ...prev, paymentMethod: opt.title }));
            }}
          >
            <div className="flex flex-col items-center justify-center">
              <Image src={opt.icon} alt={opt.title} boxSize={70} objectFit={"cover"} />
              <p className="mt-3 capitalize">{opt.title}</p>
              {opt.title === "wallet" && (
                <p className="text-xs text-gray-400">Balance {Number(user.wallet.balance).toFixed(2)}</p>
              )}
            </div>
          </Components.Default.SelectionBox>
        ))}
      </div>
    </div>
  );
};
