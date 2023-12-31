import { Components } from "../../global";
import { Divider } from "@chakra-ui/react";

export const ShippingMethodAndDateForm = ({ formData, $setter }) => {
  return (
    <div className="grid grid-flow-row gap-4">
      <div>
        <Components.Order.OrderInformationContainerHeading title={"Shipping & Delivery Details"} />
        <Divider my={3} />
        <div className="grid grid-cols-2 gap-8">
          <Components.Order.ShippingTypeSelector formData={formData} $setter={$setter} />
          <Components.Order.DeliveryDateSelector formData={formData} $setter={$setter} />
        </div>
      </div>
    </div>
  );
};
