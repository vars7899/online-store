import { IconRefresh } from "@tabler/icons-react";
import { useEffect, useState } from "react";
import * as Layout from "../../layouts";
import { Button, Tabs, TabList, Tab, TabPanels, TabPanel, Input, Badge } from "@chakra-ui/react";
import * as Component from "../../components";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-hot-toast";
import { RESET_DASHBOARD } from "../../redux/features/dashboardSlice";
import { dashboardThunkActions as DTA } from "../../redux/thunkActions";

export const ProductList = () => {
  const dispatch = useDispatch();
  const { isLoading, isSuccess, isError, message, productList } = useSelector((state) => state.dashboard);
  const [lowOnStock, setLowOnStock] = useState([]);
  const [outOfStock, setOutOfStock] = useState([]);

  const $initPage = () => {
    dispatch(DTA.GET_ALL_PRODUCTS());
  };
  useEffect(() => {
    $initPage();
  }, []);

  useEffect(() => {
    if (isError) toast.error(message);
    dispatch(RESET_DASHBOARD());
  }, [isError, message, dispatch]);

  useEffect(() => {
    if (productList) {
      setLowOnStock(productList.filter((p) => p.qty <= 10 && p.qty > 0));
      setOutOfStock(productList.filter((p) => p.qty <= 0));
    }
  }, [productList]);

  return (
    <Layout.Dashboard>
      <Component.Default.BreadCrumbList />
      <div>
        <Component.Dashboard.PageHeadline
          headline={"Store Products"}
          desc={
            " In the store product section, you can review all product with their details. You can view and edit all the product details such as product name, price etc. Access to this area is limited. Only administrator can view this section. The changes you make will come to effect immediately."
          }
          action={
            <Button variant={"outline"} leftIcon={<IconRefresh />} onClick={$initPage}>
              Reload
            </Button>
          }
        />
        <div className="mt-4">
          <Tabs variant={"line"} colorScheme="blue">
            <TabList>
              <Tab>
                <p className="mr-2">All Products</p>
                <Badge borderRadius={"md"} colorScheme="blue" variant={"outline"} size={"sm"} px={2}>
                  {productList ? productList.length : null}
                </Badge>
              </Tab>
              <Tab>
                <p className="mr-2">Low On Stock </p>
                <Badge borderRadius={"md"} colorScheme="blue" variant={"outline"} size={"sm"} px={2}>
                  {productList ? lowOnStock.length : null}
                </Badge>
              </Tab>
              <Tab>
                <p className="mr-2">Out Of Stock </p>
                <Badge borderRadius={"md"} colorScheme="blue" variant={"outline"} size={"sm"} px={2}>
                  {productList ? outOfStock.length : null}
                </Badge>
              </Tab>
            </TabList>

            <TabPanels>
              <TabPanel padding={0}>
                <Component.Dashboard.Product.ProductListTable productList={productList} />
              </TabPanel>
              <TabPanel padding={0}>
                <Component.Dashboard.Product.ProductListTable productList={lowOnStock} />
              </TabPanel>
              <TabPanel padding={0}>
                <Component.Dashboard.Product.ProductListTable productList={outOfStock} />
              </TabPanel>
            </TabPanels>
          </Tabs>
        </div>
      </div>
    </Layout.Dashboard>
  );
};
