import { Tag } from "@chakra-ui/react";
import * as Component from "..";
import toast from "react-hot-toast";

const shippingOptionData = [
  {
    title: "delivery",
    subtitle: "Package usually get delivered within 7 - 14 days",
  },
  {
    title: "store pickup",
    subtitle: "Visit one of our local distributors",
  },
];

export const ShippingTypeSelector = ({ formData, $setter }) => {
  return (
    <div>
      <p className="mb-2">Choose Shipping Type</p>
      <div className="grid grid-flow-row gap-1">
        {shippingOptionData.map((opt, index) => (
          <Component.Default.SelectionBox
            key={`shipping-option-${index}`}
            onClick={
              opt.title === "store pickup"
                ? () => toast.error("Store Pickup is currently unavailable. We are working on this feature currently.")
                : null
            }
            selected={opt.title === "store pickup" ? false : true}
          >
            <p className="font-medium capitalize">
              {opt.title}
              {opt.title === "store pickup" ? (
                <Tag colorScheme="yellow" size={"sm"}>
                  Coming Soon
                </Tag>
              ) : null}
            </p>
            <div className="flex items-center justify-between">
              <p className="text-gray-400 capitalize text-sm">{opt.subtitle}</p>
            </div>
          </Component.Default.SelectionBox>
        ))}
      </div>
    </div>
  );
};
