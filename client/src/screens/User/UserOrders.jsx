import { Layouts, Components } from "../../global";
import { Divider } from "@chakra-ui/react";

export const UserOrders = () => {
  return (
    <Layouts.ProfileSettings>
      <Components.Default.SettingsHeading
        title={"Your Orders"}
        desc="You can review and manage your orders, as well as track the progress of your deliveries."
      />
      <Divider my={4} />
      <Components.Order.UserOrderList />
    </Layouts.ProfileSettings>
  );
};
