import { Button, Divider, IconButton, Image, Select, Tag } from "@chakra-ui/react";
import { Components, Layouts } from "../../global";
import { IconChevronRight, IconDotsVertical, IconPackage, IconUser, IconUserCheck } from "@tabler/icons-react";
import { useDispatch, useSelector } from "react-redux";
import { dashboardThunkActions as DTA } from "../../redux/thunkActions";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { DateTime } from "luxon";
import { OrderStateTag } from "../../components/Order";
import ORDER_STATES from "../../constants/ORDER_STATES";

export const OrderDetails = () => {
  const { orderId } = useParams();
  const dispatch = useDispatch();
  const { selectedOrder, isLoading } = useSelector((state) => state.dashboard);

  useEffect(() => {
    dispatch(DTA.GET_ORDER_DETAILS(orderId));
  }, []);

  const $updateOrderStateHandler = (state) => {
    dispatch(DTA.UPDATE_ORDER_STATE({ orderId, state }));
  };

  if (!selectedOrder) return <div>nothing</div>;
  else if (selectedOrder)
    return (
      <Layouts.Dashboard>
        <div className="flex flex-col">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center justify-start">
                <p className="text-lg">
                  <span> Order ID </span>
                  <span className="uppercase">#{selectedOrder._id}</span>
                </p>
                <div className=" bg-accent-500 h-2 w-2 rounded-full ml-2 animate-ping"></div>
              </div>
              <div className="mt-1">
                <OrderStateTag value={selectedOrder.orderState} w={"max-content"} size={"md"} variant={"subtle"} />
              </div>
            </div>
            <div className="flex items-center">
              <UpdateOrderCurrentState
                isLoading={isLoading}
                onChange={$updateOrderStateHandler}
                defaultValue={selectedOrder.orderState}
              />
              <IconButton ml={2} icon={<IconDotsVertical />} variant={"outline"} />
            </div>
          </div>
          <div className="grid grid-cols-[1fr,_400px] gap-4 my-4 h-full">
            <div className="grid grid-flow-row-dense gap-4">
              <OrderItemsSection orderItems={selectedOrder.orderItems} />
              <PaymentSummarySection bill={selectedOrder.bill} />
              {selectedOrder.paymentMethod === "credit card" && (
                <StripeDetailsSection paymentDetails={selectedOrder.paymentDetails} />
              )}
              <ShippingDetailsSection
                estimatedDeliveryDate={selectedOrder.estimatedDeliveryDate}
                shippingMethod={selectedOrder.shippingMethod}
                shippingServiceType={selectedOrder.shippingServiceType}
                trackingNumber={selectedOrder.trackingNumber}
              />
              <SectionContainer>
                <Components.Dashboard.Orders.OrderTrackHistory />
              </SectionContainer>
            </div>
            <div className="bg-white border-[1.5px] rounded-xl px-6 py-5 h-min">
              <p>Customer Details</p>
              <Divider my={4} />
              <div className="flex items-center justify-between cursor-pointer">
                <div className="flex items-center">
                  <div className="bg-gray-100 p-2 rounded-full w-min">
                    <IconUserCheck strokeWidth={1.5} size={20} />
                  </div>
                  <p className="ml-3">{selectedOrder.user.firstName + " " + selectedOrder.user.lastName} </p>
                </div>
                <IconChevronRight size={20} className="animate-pulse" />
              </div>
              <Divider my={4} />
              <div className="flex items-center justify-between cursor-pointer">
                <div className="flex items-center">
                  <div className="bg-gray-100 p-2 rounded-full w-min">
                    <IconPackage strokeWidth={1.5} size={20} />
                  </div>
                  <p className="ml-3">Orders</p>
                </div>
                <IconChevronRight size={20} className="animate-pulse" />
              </div>
              <Divider my={4} />

              <OrderInformationSection
                title={"Contact Info"}
                informationArray={[
                  { key: "Email", value: selectedOrder.user.email },
                  { key: "Phone No.", value: selectedOrder.user.phone },
                ]}
              />
              <Divider my={4} />
              <OrderInformationSection
                title={"Shipping Address"}
                informationArray={[
                  { key: "Street Address", value: selectedOrder.shippingAddress.street },
                  { key: "City", value: selectedOrder.shippingAddress.city },
                  { key: "State", value: selectedOrder.shippingAddress.state },
                  { key: "Country", value: selectedOrder.shippingAddress.country },
                  { key: "Postal Code", value: selectedOrder.shippingAddress.postalCode },
                ]}
              />
              <Divider my={4} />
              <OrderInformationSection
                title={"Billing Address"}
                informationArray={[
                  { key: "Street Address", value: selectedOrder.billingAddress.street },
                  { key: "City", value: selectedOrder.billingAddress.city },
                  { key: "State", value: selectedOrder.billingAddress.state },
                  { key: "Country", value: selectedOrder.billingAddress.country },
                  { key: "Postal Code", value: selectedOrder.billingAddress.postalCode },
                ]}
              />
            </div>
          </div>
        </div>
      </Layouts.Dashboard>
    );
};

const SectionContainer = ({ children }) => {
  return <div className="bg-white border-[1.5px] rounded-xl px-6 py-5">{children}</div>;
};

const PaymentSummarySection = ({ bill }) => {
  return (
    <SectionContainer>
      <p>Payment Summary</p>
      <Divider my={4} />
      <Components.Default.DetailsPair title={"Subtotal"} value={bill.subtotal.toFixed(2) + " CAD"} />
      <Components.Default.DetailsPair title={"Convenience Fees"} value={bill.convenienceFees.toFixed(2) + " CAD"} />
      <Components.Default.DetailsPair title={"Goods & Service Tax (GST)"} value={bill.gst.toFixed(2) + " CAD"} />
      <Components.Default.DetailsPair title={"Province Service Tax (PST)"} value={bill.pst.toFixed(2) + " CAD"} />
      <Components.Default.DetailsPair title={"Shipping Charges"} value={bill.shippingCharges.toFixed(2) + " CAD"} />
      <Components.Default.DetailsPair title={"Discount"} value={"- " + bill.discountAmount.toFixed(2) + " CAD"} />
      <Components.Default.DetailsPair title={"Total"} value={bill.total.toFixed(2) + " CAD"} />
    </SectionContainer>
  );
};
const StripeDetailsSection = ({ paymentDetails }) => {
  return (
    <SectionContainer>
      <p>Stripe Payment Summary</p>
      <Divider my={4} />
      <Components.Default.DetailsPair
        title={"Payment Amount"}
        value={(paymentDetails.paymentAmount / 100).toFixed(2) + " CAD"}
      />
      <Components.Default.DetailsPair
        title={"Payment Date"}
        value={DateTime.fromISO(paymentDetails.paymentDate).toLocaleString(DateTime.DATE_FULL)}
      />
      <Components.Default.DetailsPair title={"payment ID"} value={paymentDetails.paymentId.toUpperCase()} />
      <Components.Default.DetailsPair title={"Payment Status"} value={paymentDetails.paymentStatus} />
    </SectionContainer>
  );
};

const ShippingDetailsSection = ({ shippingMethod, shippingServiceType, estimatedDeliveryDate, trackingNumber }) => {
  return (
    <SectionContainer>
      <p>Shipping Details</p>
      <Divider my={4} />
      <Components.Default.DetailsPair title={"Tracking Number"} value={trackingNumber} />
      <Components.Default.DetailsPair title={"Shipping Method"} value={shippingMethod} />
      <Components.Default.DetailsPair title={"Shipping Service"} value={shippingServiceType} />
      <Components.Default.DetailsPair
        title={"Estimated Delivery Day"}
        value={DateTime.fromISO(estimatedDeliveryDate).toLocaleString(DateTime.DATE_FULL)}
      />
    </SectionContainer>
  );
};

const OrderItemsSection = ({ orderItems }) => {
  return (
    <SectionContainer>
      <p>Order Items Summary</p>
      <Divider my={4} />
      <table className="w-full">
        <thead>
          <tr className="bg-gray-50 text-sm">
            <th className="py-2 px-6 text-left">Product Name</th>
            <th className="text-left">Product ID</th>
            <th className="text-left">Category ID</th>
            <th className="text-left">Supplier</th>
            <th className="text-center">Qty</th>
            <th className="px-6 text-right">Price</th>
          </tr>
        </thead>
        <tbody>
          {orderItems.map((item) => (
            <tr className="text-sm">
              <td className="py-2 px-6 truncate max-w-[240px]">{item.product.name}</td>
              <td className="text-left uppercase">{item.product._id}</td>
              <td className="text-left uppercase">{item.product.category}</td>
              <td className="capitalize">{item.product.supplier}</td>
              <td className="text-center uppercase">{item.qty}</td>
              <td className="text-right px-6">{item.product.price.toFixed(2)} CAD</td>
            </tr>
          ))}
        </tbody>
      </table>
    </SectionContainer>
  );
};

const UpdateOrderCurrentState = ({ isLoading, onChange, defaultValue }) => {
  const STATE_ENUM = [
    ORDER_STATES.PENDING,
    ORDER_STATES.PAID,
    ORDER_STATES.PROCESSING,
    ORDER_STATES.SHIPPED,
    ORDER_STATES.OUT_FOR_DELIVERY,
    ORDER_STATES.DELIVERED,
    ORDER_STATES.COMPLETED,
    ORDER_STATES.CANCELED,
    ORDER_STATES.ON_HOLD,
  ];
  return (
    <Select isDisabled={isLoading} onChange={(e) => onChange(e.target.value)} defaultValue={defaultValue}>
      {STATE_ENUM.map((item, index) => (
        <option key={`state-opt-${index}`} value={item}>
          {item}
        </option>
      ))}
    </Select>
  );
};

const OrderInformationSection = ({ title, informationArray }) => {
  const renderInformationSet = ({ key, value }) => (
    <div className="flex items-center justify-between text-sm capitalize">
      <p className="text-gray-500">{key}</p>
      <p className="">{value}</p>
    </div>
  );
  return (
    <div>
      <div className="capitalize text-sm mb-3">{title}</div>
      <div className="grid grid-flow-row gap-1">{informationArray.map((info) => renderInformationSet(info))}</div>
    </div>
  );
};
