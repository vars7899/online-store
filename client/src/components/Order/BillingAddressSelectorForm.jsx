import { Button, Divider, IconButton } from "@chakra-ui/react";
import * as Components from "..";
import { IconGridDots, IconPlus } from "@tabler/icons-react";
import { useEffect, useState } from "react";

export const BillingAddressSelectorForm = ({ shippingAddressList, formData, $setter }) => {
  const [changeBillingAddress, setChangeBillingAddress] = useState(() =>
    formData.shippingAddressId === formData.billingAddressId ? false : true
  );

  useEffect(() => {
    if (!formData.billingAddressId) {
      $setter((prev) => ({ ...prev, billingAddressId: formData.shippingAddressId }));
    }
  }, []);

  return (
    <section className="h-full">
      <Components.Order.OrderInformationContainerHeading
        title={"Billing Address"}
        opt={
          <div className="flex items-center h-[30px]">
            <Components.Address.AddNewShippingAddressModal>
              <Button variant={"link"} leftIcon={<IconPlus size={16} />} colorScheme="accent" size={"sm"}>
                Add New
              </Button>
            </Components.Address.AddNewShippingAddressModal>
            <Divider orientation="vertical" mx={4} />
            <IconButton icon={<IconGridDots size={20} />} variant={"unstyled"} />
          </div>
        }
      />
      <Divider my={4} />
      <div>
        <p className="mb-3">Choose Billing Address</p>
        <div className="grid grid-flow-row gap-4 max-h-[600px] overflow-y-scroll overscroll-x-hidden disable-scrollbars">
          <Components.Default.SelectionBox selected={formData.billingAddressId === formData.shippingAddressId}>
            <div className="flex items-center justify-between">
              <p className="font-semibold">Same as Shipping Address</p>
              <div className="h-[30px] flex items-center">
                <Button
                  variant={"link"}
                  color={"accent.500"}
                  size={"sm"}
                  onClick={() => setChangeBillingAddress((prev) => !prev)}
                >
                  Change
                </Button>
                <Divider orientation="vertical" mx={4} />
                <Button
                  variant={"link"}
                  color={"accent.500"}
                  size={"sm"}
                  onClick={() => $setter((prev) => ({ ...prev, billingAddressId: formData.shippingAddressId }))}
                >
                  Select
                </Button>
              </div>
            </div>
          </Components.Default.SelectionBox>
          {changeBillingAddress
            ? shippingAddressList.map((address, index) => (
                <Components.Address.OrderAddressCard
                  key={`billing-address-opt-${index}`}
                  address={address}
                  isDefault={null}
                  isSelected={address._id === formData.billingAddressId}
                  onClick={() => $setter((prev) => ({ ...prev, billingAddressId: address._id }))}
                  isBillingAddress={true}
                />
              ))
            : null}
        </div>
      </div>
    </section>
  );
};
