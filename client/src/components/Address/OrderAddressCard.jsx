import { Button, Divider, Radio, Tag } from "@chakra-ui/react";
import { useDispatch } from "react-redux";
import * as storeThunkActions from "../../redux/thunkActions/storeActions";
import * as Components from "../";

export const OrderAddressCard = ({ address, isDefault, isSelected, onClick, isBillingAddress }) => {
  const dispatch = useDispatch();

  const $updateDefaultShippingAddressHandler = () => {
    if (!address._id) return;
    dispatch(storeThunkActions.UPDATE_DEFAULT_SHIPPING_ADDRESS(address._id));
  };

  return (
    <Components.Default.SelectionBox selected={isSelected}>
      <div className="flex items-center justify-between">
        <div className="flex items-center justify-start">
          <p className="mr-4">
            <span className="font-semibold mr-2">{address.name}</span>
            <span>
              {address.street}, {address.postalCode}, {address.country}
            </span>
          </p>
          {isDefault && !isBillingAddress ? (
            <Tag size={"sm"} variant={"outline"} colorScheme="accent">
              Default
            </Tag>
          ) : null}
        </div>
        <div className="h-[30px] flex items-center">
          {isBillingAddress ? null : (
            <>
              <Components.Address.EditShippingAddressModal givenShippingAddress={address}>
                <Button variant={"link"} color={"accent.500"} size={"sm"}>
                  Edit
                </Button>
              </Components.Address.EditShippingAddressModal>

              {isDefault ? null : (
                <>
                  <Divider orientation="vertical" mx={4} />
                  <Button
                    variant={"link"}
                    color={"accent.500"}
                    size={"sm"}
                    onClick={$updateDefaultShippingAddressHandler}
                  >
                    Set as Default
                  </Button>
                </>
              )}
            </>
          )}

          <Divider orientation="vertical" mx={4} />
          <Button variant={"link"} color={"accent.500"} size={"sm"} onClick={onClick}>
            Select
          </Button>
        </div>
      </div>
    </Components.Default.SelectionBox>
  );
};
