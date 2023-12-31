import * as Layout from "../../layouts";
import * as Component from "../../components";
import { Button, Divider, FormControl, FormLabel, Input, Image } from "@chakra-ui/react";
import { IconChevronLeft, IconChevronRight, IconInfoOctagon } from "@tabler/icons-react";
import { useState } from "react";
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

export const CustomerBillingDetails = () => {
  const [deliveryDay, setDeliveryDay] = useState();
  const [shippingType, setShippingType] = useState();
  const [paymentType, setPaymentType] = useState(paymentOptions[0].title);

  return (
    <Layout.Basic>
      <div className="mb-8">
        <div>
          <p className="text-2xl capitalize font-medium tracking-wide">Billing Details</p>
          <p className="mt-1 text-sm">The next step in the purchasing process is to enter your billing information.</p>
        </div>
        <div className="mt-6 grid grid-cols-[1fr,_480px] h-[100%] gap-8">
          <div className="grid grid-flow-row gap-4">
            <div className="rounded-xl px-12 py-8 border-[1px] border-gray-200">
              <div>
                <div className="flex items-center justify-start">
                  <p className="font-semibold text-lg tracking-wide mr-1">Customer Details</p>
                  <IconInfoOctagon size={20} className="text-gray-600" strokeWidth={1.5} />
                </div>
                <Divider my={4} />
                <form className="mt-4">
                  <div className="grid grid-cols-2 gap-8">
                    <FormControl>
                      <FormLabel>First name</FormLabel>
                      <Input type="text" value={""} onChange={""} />
                    </FormControl>
                    <FormControl>
                      <FormLabel>Last name</FormLabel>
                      <Input type="text" value={""} onChange={""} />
                    </FormControl>
                  </div>
                  <FormControl mt={4}>
                    <FormLabel>Email Address</FormLabel>
                    <Input type="email" value={""} onChange={""} />
                  </FormControl>
                  <FormControl mt={4}>
                    <FormLabel>Phone Number</FormLabel>
                    <Input type="number" value={""} onChange={""} />
                  </FormControl>
                </form>
              </div>
            </div>
            <div className="rounded-xl px-12 py-8 border-[1px] border-gray-200">
              <OrderInformationContainerHeading title={"Shipping & Delivery Details"} />
              <Divider my={4} />
              <div className="grid grid-cols-2 gap-8">
                <Component.Order.OrderShippingType />
                <Component.Order.OrderDeliveryDateSelector setDeliveryDay={setDeliveryDay} deliveryDay={deliveryDay} />
              </div>
            </div>
            <div className="rounded-xl px-12 py-8 border-[1px] border-gray-200">
              <OrderInformationContainerHeading title={"Payment Type"} />
              <Divider my={4} />
              <div className="grid grid-cols-4 gap-4">
                {paymentOptions.map((opt, index) => (
                  <Component.Default.SelectionBox
                    key={`payment-opt-${index}`}
                    selected={paymentType === opt.title}
                    onClick={() => setPaymentType(opt.title)}
                  >
                    <div className="flex flex-col items-center justify-center">
                      <Image src={opt.icon} alt={opt.title} boxSize={70} objectFit={"cover"} />
                      <p className="mt-3 capitalize">{opt.title}</p>
                    </div>
                  </Component.Default.SelectionBox>
                ))}
              </div>
            </div>
          </div>
          <div className="bg-blue-200"></div>
        </div>
      </div>
    </Layout.Basic>
  );
};
