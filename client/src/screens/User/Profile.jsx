import { useEffect } from "react";
import { Layouts, Components } from "../../global";
import { IconReload } from "@tabler/icons-react";
import { Tabs, TabList, TabPanels, Tab, TabPanel, Button, Tag } from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { storeThunkActions } from "../../redux/thunkActions";
import toast from "react-hot-toast";

export const Profile = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const dispatch = useDispatch();
  const storeState = useSelector((state) => state.store);
  const authState = useSelector((state) => state.auth);

  const $initPageData = () => {
    dispatch(storeThunkActions.GET_ALL_SHIPPING_ADDRESS());
  };

  useEffect(() => {
    $initPageData();
  }, []);

  useEffect(() => {
    if (storeState.isError) {
      toast.error(storeState.message);
      dispatch(storeThunkActions.RESET_STORE());
    }
  }, [storeState.isError, storeState.message, dispatch]);

  return (
    <Layouts.ProfileSettings>
      <>
        <Components.Default.SettingsHeading
          title={"User Profile"}
          desc="Update and manage your personal details here."
          action={
            <Button
              colorScheme="gray"
              variant={"outline"}
              size={"sm"}
              leftIcon={<IconReload />}
              onClick={$initPageData}
              children={"Reload"}
            />
          }
        />
        <Tabs
          variant="line"
          colorScheme="blue"
          mt={4}
          defaultIndex={searchParams.get("tab") ? Number(searchParams.get("tab")) : 0}
        >
          <TabList>
            <Tab onClick={() => setSearchParams({ tab: 0 })}>User Details</Tab>
            <Tab onClick={() => setSearchParams({ tab: 1 })}>Billing Address</Tab>
            <Tab onClick={() => setSearchParams({ tab: 2 })}>
              <p>Shipping Address</p>
              <Tag className="ml-2" colorScheme="blue" variant={"outline"} size={"sm"}>
                {storeState.shippingAddressList ? storeState.shippingAddressList.length : 0}
              </Tag>
            </Tab>
          </TabList>
          <TabPanels className="rounded-md">
            <TabPanel>
              {!authState.user ? <div>Loading</div> : <Components.User.PersonalInformationTab user={authState.user} />}
            </TabPanel>
            <TabPanel>
              <Components.User.BillingAddressTab />
            </TabPanel>
            <TabPanel>
              <Components.User.ShippingAddressList
                shippingAddressList={storeState.shippingAddressList}
                defaultShippingAddress={storeState.defaultShippingAddress}
                isLoading={storeState.isLoading}
              />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </>
    </Layouts.ProfileSettings>
  );
};
