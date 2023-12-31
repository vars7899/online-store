import { Button, Divider, Skeleton } from "@chakra-ui/react";
import * as Components from "../../components";
import { useEffect, useState } from "react";
import { IconAlertTriangle } from "@tabler/icons-react";

export const ShippingAddressList = ({ shippingAddressList, defaultShippingAddress, isLoading }) => {
  const [otherShippingAddressList, setOtherShippingAddressList] = useState([]);

  useEffect(() => {
    if (!defaultShippingAddress) setOtherShippingAddressList(shippingAddressList);
    else {
      setOtherShippingAddressList([
        ...shippingAddressList.filter((address) => address._id !== defaultShippingAddress._id),
      ]);
    }
  }, [defaultShippingAddress, shippingAddressList]);

  console.log(otherShippingAddressList);

  return (
    <div>
      <Components.Default.SettingsPairContainer
        title={"default shipping address"}
        desc={
          "This address is designated as the default destination for shipments and is used by default unless specified otherwise during the ordering process."
        }
      >
        {isLoading && !defaultShippingAddress ? (
          <Skeleton height={175} rounded={"xl"} />
        ) : !defaultShippingAddress ? (
          <div className="border-[1.5px] rounded-xl p-4 flex items-center">
            <div className="bg-yellow-200 text-yellow-500 p-4 rounded-full">
              <IconAlertTriangle size={36} strokeWidth={1.5} />
            </div>
            <div className="ml-4">
              <p>Missing Default Address</p>
              <p className="text-sm text-gray-500">
                It appears that you haven't set a default shipping address, and we highly recommend having one for a
                smoother shipping process.
              </p>
            </div>
          </div>
        ) : (
          <Components.User.ShippingAddressCard
            isDefaultShippingAddress={true}
            address={defaultShippingAddress}
            isLoading={isLoading}
          />
        )}
      </Components.Default.SettingsPairContainer>
      {otherShippingAddressList.length ? (
        <>
          <Divider my={2} />
          <Components.Default.SettingsPairContainer
            title={"other shipping address"}
            desc={
              "A shipping address is the specific location to which a package, parcel, or shipment is to be delivered."
            }
          >
            <div className="grid grid-flow-row gap-4 max-h-[370px] overflow-y-scroll disable-scrollbars">
              {!otherShippingAddressList.length ? (
                <div>
                  <Skeleton height={175} rounded={"xl"} mb={4} />
                  <Skeleton height={175} rounded={"xl"} />
                </div>
              ) : (
                otherShippingAddressList.map((address, index) => (
                  <Components.User.ShippingAddressCard key={`user-address-${index}`} address={address} />
                ))
              )}
            </div>
          </Components.Default.SettingsPairContainer>
        </>
      ) : null}

      <Divider my={2} />
      <Components.Default.SettingsPairContainer
        title={"Add New shipping address"}
        desc={
          "Please take a moment to add a new shipping address to your account, ensuring that your shipments are directed to the desired location."
        }
      >
        <Components.Address.AddNewShippingAddressModal>
          <Button variant={"outline"}>Add New Address</Button>
        </Components.Address.AddNewShippingAddressModal>
      </Components.Default.SettingsPairContainer>
    </div>
  );
};
