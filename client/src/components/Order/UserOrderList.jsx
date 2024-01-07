import { Suspense, lazy, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { orderThunkActions, storeThunkActions } from "../../redux/thunkActions";
import toast from "react-hot-toast";
import { RESET_ORDER } from "../../redux/features/orderSlice";
import { DateTime } from "luxon";
import { Button, Divider, Image, Tag, Select, Center } from "@chakra-ui/react";
import { IconFilter } from "@tabler/icons-react";
import { OrderFilterSideBar } from "./OrderFilterSideBar";
import { useNavigate } from "react-router-dom";
import ReactPaginate from "react-paginate";
// << Lazy
const ReviewModal = lazy(() => import("../User/ReviewModal"));

export const UserOrderList = () => {
  const ITEMS_PER_PAGE = 4;
  const [itemOffset, setItemOffset] = useState(0); // pagination offset
  const durationOptions = [
    { title: "All Orders", value: "all" },
    { title: "Last 24 Hours", value: DateTime.now().minus({ hours: 24 }).toISO() },
    { title: "This Month", value: DateTime.now().minus({ week: 1 }).toISO() },
    { title: "This Year", value: DateTime.now().minus({ year: 1 }).toISO() },
  ];
  const dispatch = useDispatch();
  const { orderList, isError, message, isLoading } = useSelector((state) => state.order);
  const [orderFilter, setOrderFilter] = useState({
    orderState: "all",
    paymentMethod: "all",
    shippingMethod: "all",
    shippingServiceType: "all",
    orderDuration: "all",
  });

  const $initPageData = () => dispatch(orderThunkActions.GET_ALL_USER_ORDERS());
  const $loadOrderListWithFilter = () => dispatch(orderThunkActions.GET_ALL_USER_ORDERS(orderFilter));

  useEffect(() => {
    $initPageData();
  }, []);

  useEffect(() => {
    if (isError) toast.error(message);
    dispatch(RESET_ORDER());
  }, [isError, message, dispatch]);

  useEffect(() => {
    dispatch(orderThunkActions.GET_ALL_USER_ORDERS(orderFilter));
  }, [orderFilter.orderDuration]);

  // >> React Pagination
  const endOffset = itemOffset + ITEMS_PER_PAGE;
  const currentOrders = orderList.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(orderList.length / ITEMS_PER_PAGE);

  // Invoke when user click to request another page.
  const handlePageClick = (event) => {
    const newOffset = (event.selected * ITEMS_PER_PAGE) % orderList.length;
    setItemOffset(newOffset);
    window.scrollTo(0, 0);
  };

  return (
    <div>
      <div className="mb-4 flex items-center justify-between">
        <Tag size={"lg"} variant={"outline"} colorScheme="blue">
          Orders : {orderList ? orderList.length : 0}
        </Tag>
        <div className="flex">
          <Select
            size={"sm"}
            maxW={"xs"}
            mr={3}
            // value={orderFilter.orderDuration}
            onChange={(e) => setOrderFilter((prev) => ({ ...prev, orderDuration: e.target.value }))}
          >
            {durationOptions.map((dur) => (
              <option key={dur.title} value={dur.value}>
                {dur.title}
              </option>
            ))}
          </Select>
          <OrderFilterSideBar
            orderFilter={orderFilter}
            setOrderFilter={setOrderFilter}
            $updateAction={$loadOrderListWithFilter}
          >
            <Button size={"sm"} leftIcon={<IconFilter size={18} />} variant={"outline"}>
              Filter
            </Button>
          </OrderFilterSideBar>
        </div>
      </div>
      <div className="grid gap-4">
        {currentOrders.map((order) => (
          <OrderDetailCard key={order?._id} order={order} />
        ))}
      </div>
      <Center>
        {orderList.length > ITEMS_PER_PAGE && (
          <ReactPaginate
            className="paginate"
            activeClassName="paginate-item active-paginate-item"
            breakClassName="paginate-item"
            pageClassName="paginate-item"
            nextClassName="paginate-move-item"
            previousClassName="paginate-move-item"
            breakLabel="..."
            nextLabel=">"
            onPageChange={handlePageClick}
            pageRangeDisplayed={5}
            pageCount={pageCount}
            previousLabel="<"
            renderOnZeroPageCount={null}
          />
        )}
      </Center>
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
