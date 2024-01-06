import { Button, Divider, IconButton } from "@chakra-ui/react";
import * as Components from "..";
import { IconGridDots, IconPlus } from "@tabler/icons-react";
import { useEffect } from "react";

export const ShippingAddressSelectorForm = ({ shippingAddressList, defaultShippingAddress, formData, $setter }) => {
  useEffect(() => {
    if (!formData.shippingAddressId) {
      $setter((prev) => ({
        ...prev,
        shippingAddressId: defaultShippingAddress._id,
      }));
    }
  }, []);

  return (
    <section className="h-full">
      <Components.Order.OrderInformationContainerHeading
        title={"Shipping Address"}
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
      {shippingAddressList.length ? (
        <div>
          <p className="mb-3">Choose Shipping Address</p>
          <div className="grid grid-flow-row gap-2 max-h-[600px] overflow-y-scroll overscroll-x-hidden disable-scrollbars">
            {shippingAddressList.map((address, index) => (
              <Components.Address.OrderAddressCard
                key={`billing-address-opt-${index}`}
                address={address}
                isDefault={address._id === defaultShippingAddress._id}
                isSelected={address._id === formData.shippingAddressId}
                onClick={() => $setter((prev) => ({ ...prev, shippingAddressId: address._id }))}
              />
            ))}
          </div>
        </div>
      ) : (
        <div className="h-[90%]">
          <Components.Address.EmptyShippingAddressPlaceholder />
        </div>
      )}
    </section>
  );
};
