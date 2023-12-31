import { Button } from "@chakra-ui/react";
import { IconAlertTriangle } from "@tabler/icons-react";
import * as Components from "../";

export const EmptyShippingAddressPlaceholder = () => {
  return (
    <section className="flex flex-col items-center justify-center bg-gray-50 rounded-xl py-10 h-[100%]">
      <div className="text-blue-500 bg-blue-100 p-6 rounded-full animate-bounce">
        <IconAlertTriangle size={60} strokeWidth={1.25} />
      </div>
      <p className="text-lg font-semibold mt-6">Shipping Address Missing</p>
      <p className="max-w-sm text-center mt-1">Tap add to add new button to add new address to profile</p>
      <Components.Address.AddNewShippingAddressModal>
        <Button mt={8} variant="outline" colorScheme="gray">
          Add Address
        </Button>
      </Components.Address.AddNewShippingAddressModal>
    </section>
  );
};
