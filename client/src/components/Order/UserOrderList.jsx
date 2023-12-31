import { Suspense, lazy, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { orderThunkActions, storeThunkActions } from "../../redux/thunkActions";
import toast from "react-hot-toast";
import { resetOrder } from "../../redux/features/orderSlice";
import { DateTime } from "luxon";
import {
  Button,
  Divider,
  IconButton,
  Image,
  Tag,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Select,
} from "@chakra-ui/react";
import { IconChevronDown, IconChevronUp, IconDotsVertical, IconFilter } from "@tabler/icons-react";
import { OrderFilterSideBar } from "./OrderFilterSideBar";
import { OrderStateTag } from "./OrderStateTag";
import { useNavigate } from "react-router-dom";
// << Lazy
const ReviewModal = lazy(() => import("../User/ReviewModal"));

export const UserOrderList = () => {
  const durationOptions = [
    { title: "Today", value: 1 },
    { title: "This Month", value: 30 },
    { title: "This Year", value: 365 },
    { title: "All Orders", value: 0 },
  ];
  const dispatch = useDispatch();
  const { orderList, isError, message, isLoading } = useSelector((state) => state.order);
  const [orderFilter, setOrderFilter] = useState({
    orderState: "all",
    paymentMethod: "all",
    shippingMethod: "all",
    shippingServiceType: "all",
  });

  const $initPageData = () => dispatch(orderThunkActions.getAllUserOrders());
  const $loadOrderListWithFilter = () => dispatch(orderThunkActions.getAllUserOrders(orderFilter));

  useEffect(() => {
    $initPageData();
  }, []);

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }
    dispatch(resetOrder());
  }, [isError, message, dispatch]);

  return (
    <div>
      <div className="mb-4 flex items-center justify-end">
        <Select></Select>
        <OrderFilterSideBar
          orderFilter={orderFilter}
          setOrderFilter={setOrderFilter}
          $updateAction={$loadOrderListWithFilter}
        >
          <Button leftIcon={<IconFilter />} variant={"outline"}>
            Filter
          </Button>
        </OrderFilterSideBar>
      </div>
      <div className="grid gap-4">
        {orderList.map((order) => (
          <OrderDetailCard key={order?._id} order={order} />
        ))}
      </div>
    </div>
  );
};

const OrderDetailCard = ({ order }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [expand, setExpand] = useState(false);

  const $handleBuyAgain = (product) => {
    if (!product._id) return;
    dispatch(storeThunkActions.ADD_PRODUCT_TO_USER_CART({ productId: product._id, qty: { qty: 1 } }));
    toast.success(`${product.name} Added to cart`);
  };

  const productDetails = (title, value) => {
    return (
      <p className="text-xs w-full flex flex-col xl:flex-row xl:items-center justify-between">
        <span>{title}</span>
        <span className="uppercase mt-1">{value}</span>
      </p>
    );
  };

  return (
    <div className="border-[1.5px] rounded-lg px-4 py-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <OrderInfoWithTitle
            title="order Placed"
            titleClassName={"uppercase"}
            value={DateTime.fromISO(order.createdAt).toLocaleString(DateTime.DATETIME_MED)}
            valueClassName={"uppercase"}
            className={"mr-6"}
          />
          <OrderInfoWithTitle
            title="Total"
            titleClassName={"!uppercase"}
            value={Number(order.bill.total).toFixed(2) + " CAD"}
            valueClassName={"uppercase"}
            className={"pr-8"}
          />
          <OrderInfoWithTitle
            title="Ship To"
            titleClassName={"!uppercase"}
            value={order.shippingAddress.name}
            className={"mr-6"}
          />
          <OrderInfoWithTitle title="Tracking ID" titleClassName={"!uppercase"} value={order.trackingNumber} />
        </div>
        <div className="flex items-center">
          <OrderInfoWithTitle
            title={"Order ID #" + order._id}
            titleClassName={"!uppercase"}
            value={
              <div className="flex items-center">
                <Button variant={"link"} size={"xs"} colorScheme="blue">
                  View Invoice
                </Button>
                <div className="px-2"></div>
                <Button variant={"link"} size={"xs"} colorScheme="blue" onClick={() => setExpand((prev) => !prev)}>
                  View More Details
                </Button>
              </div>
            }
            className={"mr-6"}
          />
        </div>
      </div>
      <Divider my={2} />

      <div className="mt-4">
        {order.orderItems.map((item) => (
          <div className="grid xl:grid-cols-[180px,_1fr,_200px] gap-6 pb-2">
            <div className="rounded-xl overflow-hidden px-6 py-4 bg-gray-100 flex items-center justify-center">
              <Image src={item.product.img.url} loading="lazy" boxSize={100} objectFit={"cover"} />
            </div>
            <div className="max-w">
              <p className="text-sm">{item?.product?.name}</p>
              <Divider my={2} />
              <div className="text-gray-500">
                {productDetails("Product SKU ID", `# ${item?.product._id}`)}
                {productDetails("Product Quantity Ordered", `${item?.qty} NOS`)}
                {productDetails("Product Individual Price", `${item?.product.price.toFixed(2)} CAD`)}
                {productDetails("Product Supplier", item?.product.supplier)}
              </div>
            </div>
            <div className="w-full flex flex-col">
              <Suspense>
                <ReviewModal item={item}>
                  <Button w={"full"} mb={2} size={"sm"} variant={"outline"}>
                    Leave a Review
                  </Button>
                </ReviewModal>
              </Suspense>
              <Button
                w={"full"}
                mb={2}
                size={"sm"}
                variant={"outline"}
                onClick={() => navigate(`/components/${item?.product._id}`)}
              >
                View Details
              </Button>
              <Button w={"full"} mb={2} size={"sm"} variant={"outline"} onClick={() => $handleBuyAgain(item.product)}>
                Buy Again
              </Button>
            </div>
          </div>
        ))}
      </div>
      {expand && (
        <div>
          <Divider my={2} />
          <div className="grid xl:grid-cols-[0.75fr,_1.5fr,1.5fr,_1fr,_1fr] gap-4">
            <OrderInfoWithTitle
              title="Order Status"
              valComp={
                <Tag colorScheme="orange" size={"sm"}>
                  {order?.orderState}
                </Tag>
              }
            />
            <OrderInfoWithTitle title="Order Id" value={"# " + order?._id} valueClassName={"uppercase"} />
            <OrderInfoWithTitle title="tracking id" value={"# " + order?.trackingNumber} valueClassName={"uppercase"} />
            <OrderInfoWithTitle
              title="created at"
              value={DateTime.fromISO(order?.createdAt).toLocaleString(DateTime.DATETIME_SHORT)}
            />
            <OrderInfoWithTitle
              title="Last updated"
              value={DateTime.fromISO(order?.updatedAt).toLocaleString(DateTime.DATETIME_SHORT)}
            />
            <OrderInfoWithTitle
              title="payment status"
              value={
                order?.paymentMethod === "credit card"
                  ? order?.paymentDetails?.paymentStatus
                  : order?.paymentMethod === "cash on delivery"
                  ? "- NA -"
                  : "--"
              }
              valueClassName={"capitalize"}
            />
            <OrderInfoWithTitle
              title="payment Id"
              value={
                order?.paymentMethod === "credit card"
                  ? "# " + order?.paymentDetails?.paymentId
                  : order?.paymentMethod === "cash on delivery"
                  ? "- NA -"
                  : "--"
              }
              valueClassName={"uppercase"}
            />
            <OrderInfoWithTitle
              title="payment amount"
              value={
                order?.paymentMethod === "credit card"
                  ? (order?.paymentDetails?.paymentAmount / 100).toFixed(2) + " CAD"
                  : order?.paymentMethod === "cash on delivery"
                  ? "- NA -"
                  : "--"
              }
            />
            <OrderInfoWithTitle
              title="payment date"
              value={
                order?.paymentMethod === "credit card"
                  ? DateTime.fromISO(order?.paymentDetails?.paymentDate).toLocaleString(DateTime.DATETIME_SHORT)
                  : order?.paymentMethod === "cash on delivery"
                  ? "- NA -"
                  : "--"
              }
            />
            <OrderInfoWithTitle title="Payment Method" value={order?.paymentMethod} valueClassName={"capitalize"} />
          </div>
          <Divider my={2} />
          <div className="grid xl:grid-cols-[0.75fr,_1.5fr,1.5fr,_1fr,_1fr] gap-4">
            <OrderInfoWithTitle
              title="Street Address"
              value={order?.shippingAddress.street}
              valueClassName={"capitalize truncate"}
            />
            <OrderInfoWithTitle title="City" value={order?.shippingAddress.city} valueClassName={"capitalize"} />
            <OrderInfoWithTitle title="State" value={order?.shippingAddress.state} valueClassName={"capitalize"} />
            <OrderInfoWithTitle title="Country" value={order?.shippingAddress.country} valueClassName={"capitalize"} />
            <OrderInfoWithTitle
              title="Postal Code"
              value={order?.shippingAddress.postalCode}
              valueClassName={"capitalize"}
            />
          </div>
        </div>
      )}
    </div>
  );
};

const OrderInfoWithTitle = ({ title, value, valComp, titleClassName, valueClassName, className }) => {
  return (
    <div className={className}>
      <p className={`capitalize text-xs text-gray-500 ${titleClassName}`}>{title}</p>
      <p className={`text-sm mt-[2px] ${valueClassName}`}>{value}</p>
      {valComp ? valComp : null}
    </div>
  );
};
