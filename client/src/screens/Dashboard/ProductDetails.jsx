import { Layouts, Components } from "../../global";
import { useParams } from "react-router-dom";
import { Suspense, lazy, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GET_ALL_PRODUCT_CATEGORIES, GET_PRODUCT_DETAILS, RESET_DASHBOARD } from "../../redux/features/dashboardSlice";
import { toast } from "react-hot-toast";
import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";
import { IconAlertTriangle } from "@tabler/icons-react";

const ProductReviewAnalysis = lazy(() => import("../../components/Dashboard/Product/ProductReviewAnalysis"));

export const ProductDetails = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const { isError, message, selectedProduct, categoryList } = useSelector((state) => state.dashboard);

  const $initPage = () => {
    dispatch(GET_PRODUCT_DETAILS(params.productId));
    dispatch(GET_ALL_PRODUCT_CATEGORIES());
  };

  useEffect(() => {
    $initPage();
  }, []);

  useEffect(() => {
    if (isError) toast.error(message);
    dispatch(RESET_DASHBOARD());
  }, [isError, message, dispatch]);

  return (
    <Layouts.Dashboard>
      <Components.Default.BreadCrumbList />
      <Components.Dashboard.PageHeadline
        headline={"Product Details"}
        desc={
          "In the product details section, you can review all product details. You can view and edit all the product details such as name, feature visibility etc. Access to this area is limited. Only administrator can view this section. The changes you make will come to effect immediately."
        }
      />

      <Tabs mt={4}>
        <TabList>
          <Tab>Product Details</Tab>
          <Tab>Review Analytics</Tab>
          <Tab>Sales Analytics</Tab>
          <Tab>
            <IconAlertTriangle size={16} className="mr-2" />
            Danger Zone
          </Tab>
        </TabList>
        <TabPanels>
          <TabPanel paddingX={0}>
            <Components.Dashboard.Product.ProductDetailsForm product={selectedProduct} categoryList={categoryList} />
          </TabPanel>
          <TabPanel>
            <Suspense>{selectedProduct && <ProductReviewAnalysis product={selectedProduct} />}</Suspense>
          </TabPanel>
          <TabPanel>
            <p>three!</p>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Layouts.Dashboard>
  );
};
