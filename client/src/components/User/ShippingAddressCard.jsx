import { Button, Divider, Skeleton, Tag } from "@chakra-ui/react";
import { useDispatch } from "react-redux";
import * as storeActions from "../../redux/thunkActions/storeActions";
import * as Components from "../../components";

export const ShippingAddressCard = ({ isDefaultShippingAddress, address, isLoading }) => {
  const dispatch = useDispatch();

  const $updateDefaultShippingAddressHandler = () => {
    if (!address._id) return;
    dispatch(storeActions.UPDATE_DEFAULT_SHIPPING_ADDRESS(address._id));
  };
  const $deleteShippingAddressHandler = () => {
    if (!address._id) return;
    dispatch(storeActions.DELETE_SHIPPING_ADDRESS(address._id));
  };

  if (isLoading) {
    return <Skeleton height={175} rounded={"xl"} />;
  } else
    return (
      <div className="border-[1.5px] rounded-xl p-4">
        <div className="flex items-center justify-between">
          <p className="capitalize font-semibold">{address?.name}</p>

          <Tag variant={"outline"} size={"sm"} colorScheme={isDefaultShippingAddress ? "blue" : "gray"}>
            {isDefaultShippingAddress ? "Default" : address?.country}
          </Tag>
        </div>
        <Divider my={2} />
        <div className="text-sm text-gray-500">
          <p className="">
            <span className="mr-1">Contact Information -</span>
            <span>{address?.contactInformation}</span>
          </p>
          <p className="">
            {address?.street}, {address?.state}, {address?.country}
          </p>
          <p className="">{address?.postalCode}</p>
        </div>
        <Divider my={2} />
        <div className="flex items-center justify-between">
          <div className="flex items-center justify-start">
            {address ? (
              <Components.Address.EditShippingAddressModal givenShippingAddress={address}>
                <Button variant={"link"} size={"sm"} colorScheme="blue">
                  Edit
                </Button>
              </Components.Address.EditShippingAddressModal>
            ) : null}
            <Components.Address.ShippingAddressDeleteConfirmationModal onClick={$deleteShippingAddressHandler}>
              <Button ml={4} variant={"link"} size={"sm"} colorScheme="blue">
                Delete
              </Button>
            </Components.Address.ShippingAddressDeleteConfirmationModal>
          </div>
          {isDefaultShippingAddress ? null : (
            <Button
              ml={4}
              variant={"link"}
              size={"sm"}
              colorScheme="blue"
              onClick={$updateDefaultShippingAddressHandler}
            >
              Set as Default
            </Button>
          )}
        </div>
      </div>
    );
};
