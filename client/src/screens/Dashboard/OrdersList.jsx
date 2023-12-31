import { Badge, Button, Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/react";
import { Components, Layouts } from "../../global";
import { IconRefresh } from "@tabler/icons-react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { dashboardThunkActions as DBT } from "../../redux/thunkActions";
import toast from "react-hot-toast";
import { RESET_DASHBOARD, segregateOrderType } from "../../redux/features/dashboardSlice";

export const OrdersList = () => {
  const dispatch = useDispatch();
  const { orderList, isError, message, segregatedOrderList, isLoading } = useSelector((state) => state.dashboard);

  const $initPageData = () => {
    dispatch(DBT.getAllStoreOrders());
  };

  useEffect(() => {
    $initPageData();
  }, []);

  useEffect(() => {
    if (orderList && orderList.length) {
      dispatch(segregateOrderType(orderList));
    }
  }, [orderList]);

  // !! Handle Error
  useEffect(() => {
    if (isError) {
      toast.error(message);
    }
    dispatch(RESET_DASHBOARD());
  }, [dispatch, isError, message]);

  // !! List of tabs and list its going to showcase
  const tabs = [
    { header: "All Orders", data: orderList },
    { header: "Pending", data: segregatedOrderList.pending },
    { header: "Paid", data: segregatedOrderList.paid },
    { header: "Processing", data: segregatedOrderList.processing },
    { header: "Shipped", data: segregatedOrderList.shipped },
    { header: "Out for Delivery", data: segregatedOrderList.outForDelivery },
    { header: "Delivered", data: segregatedOrderList.delivered },
    { header: "Completed", data: segregatedOrderList.completed },
    { header: "Canceled", data: segregatedOrderList.canceled },
    { header: "On Hold", data: segregatedOrderList.onHold },
  ];

  // !! prepare the array which is going to contain the object with tab details
  const prepareTabContent = tabs.map(({ header, data }) => ({
    header: header,
    amount: data ? data.length : 0,
    panel: <Components.Dashboard.Orders.OrdersListTable orderList={data} />,
  }));

  return (
    <Layouts.Dashboard>
      <div className="flex flex-col flex-1">
        <Components.Default.BreadCrumbList />
        <Components.Dashboard.PageHeadline
          headline={"Order List"}
          desc={
            "In the store order list section, you can review all orders with their details. You can view and edit all the orders details such as order current status, delivery date etc. Access to this area is limited and controlled. Only Administrator or Super Admin can view this section. The changes you make will come to effect immediately."
          }
          action={
            <Button
              isLoading={isLoading}
              variant={"outline"}
              leftIcon={<IconRefresh size={20} />}
              onClick={$initPageData}
            >
              Reload
            </Button>
          }
        />
        <div className="mt-4 flex-1">
          <Tabs variant={"line"} colorScheme="accent">
            <TabList>
              {prepareTabContent.map(({ header, amount }, index) => (
                <Tab key={`tab-header-${index}`}>
                  <p className="mr-2">{header}</p>
                  <Badge borderRadius={"md"} colorScheme="accent" variant={"outline"} size={"sm"} px={2}>
                    {amount}
                  </Badge>
                </Tab>
              ))}
            </TabList>

            <TabPanels>
              {prepareTabContent.map(({ amount, panel }, index) => (
                <TabPanel key={`tab-panel-${index}`} padding={0} className="h-full">
                  <div className="h-full ">
                    {amount > 0 ? panel : <Components.Default.EmptyCaution className="mt-8" />}
                  </div>
                </TabPanel>
              ))}
            </TabPanels>
          </Tabs>
        </div>
      </div>
    </Layouts.Dashboard>
  );
};
