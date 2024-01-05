import { Layouts, Components } from "../../global";
import { useParams } from "react-router-dom";
import { Suspense, lazy, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GET_ALL_PRODUCT_CATEGORIES, GET_PRODUCT_DETAILS, RESET_DASHBOARD } from "../../redux/features/dashboardSlice";
import { toast } from "react-hot-toast";
import { Tabs, TabList, TabPanels, Tab, TabPanel, Tag, Divider, Image, Button } from "@chakra-ui/react";
import { IconAlertTriangle, IconRefresh } from "@tabler/icons-react";
import { DateTime } from "luxon";

const ProductReviewAnalysis = lazy(() => import("../../components/Dashboard/Product/ProductReviewAnalysis"));

export const ProductDetails = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const { isError, message, selectedProduct, categoryList, isLoading } = useSelector((state) => state.dashboard);

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
      {!selectedProduct ? (
        <p>Loading.....</p>
      ) : (
        <>
          <ProductDetailSummary selectedProduct={selectedProduct} $initPage={$initPage} isLoading={isLoading} />
          <Divider my={4} />
          <Tabs size={"sm"} variant={"soft-rounded"} colorScheme="gray">
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
              <TabPanel>
                <Components.Dashboard.Product.ProductDetailsForm
                  product={selectedProduct}
                  categoryList={categoryList}
                />
              </TabPanel>
              <TabPanel>
                <Suspense>{selectedProduct && <ProductReviewAnalysis product={selectedProduct} />}</Suspense>
              </TabPanel>
              <TabPanel>
                <p>three!</p>
              </TabPanel>
            </TabPanels>
          </Tabs>
        </>
      )}
    </Layouts.Dashboard>
  );
};

const ProductDetailSummary = ({ selectedProduct, $initPage, isLoading }) => {
  return (
    <div className="rounded-lg grid grid-cols-[300px,_1fr] gap-6">
      <div>
        <div className="mb-4 rounded-lg flex items-center justify-center h-full brightness-50">
          <Image
            src={selectedProduct?.img.url}
            borderRadius={"lg"}
            width={300}
            height={"full"}
            alt={selectedProduct.name}
            objectFit={"cover"}
          />
        </div>
      </div>
      <div>
        <div className="flex justify-between">
          <div>
            <Tag size={"sm"} className="capitalize" mb={2} colorScheme="gray" variant={"subtle"} isTruncated>
              {selectedProduct.supplier}
            </Tag>
            <p className="font-semibold text-lg">{selectedProduct.name}</p>
          </div>
          <Button
            variant={"outline"}
            size={"sm"}
            leftIcon={<IconRefresh size={16} />}
            onClick={$initPage}
            isLoading={isLoading}
          >
            Reload
          </Button>
        </div>
        <Divider my={2} />
        <ProductDetailPair left={"Product SKU"} right={selectedProduct._id} rightClassName={"uppercase"} />
        <ProductDetailPair left={"Total Sold"} right={selectedProduct.totalSold} />
        <ProductDetailPair
          left={"Stock Status"}
          right={selectedProduct.qty <= 0 ? "Out Of Stock" : selectedProduct.qty > 10 ? "Available" : "Low On Stock"}
        />
        <ProductDetailPair left={"Available Stock Quantity"} right={selectedProduct.qty} />
        <ProductDetailPair
          left={"Created At"}
          right={DateTime.fromISO(selectedProduct.createdAt).toLocaleString(DateTime.DATETIME_MED)}
        />
        <ProductDetailPair left={"Category ID"} right={selectedProduct.category._id} rightClassName={"uppercase"} />
        <ProductDetailPair
          left={"Category Owner"}
          right={`${selectedProduct.category.createdBy.firstName} ${selectedProduct.category.createdBy.lastName}`}
        />
        <ProductDetailPair
          left={"Last Updated"}
          right={DateTime.fromISO(selectedProduct.updatedAt).toLocaleString(DateTime.DATETIME_MED)}
        />
      </div>
    </div>
  );
};

const ProductDetailPair = ({ left, right, leftClassName, rightClassName }) => {
  return (
    <div className="text-xs flex items-center justify-between mb-1.5 !font-extralight">
      <div className={`${leftClassName} text-gray-400`}>{left}</div>
      <div className={`${rightClassName}`}>{right}</div>
    </div>
  );
};

