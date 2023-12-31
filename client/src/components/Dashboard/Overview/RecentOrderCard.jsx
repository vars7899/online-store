import { useNavigate } from "react-router-dom";
import { OverviewCardBox, OverviewCardContainer } from "./OverviewCardContainer";
import { IconAlertCircle, IconBox, IconCopy, IconFileSymlink, IconPackage } from "@tabler/icons-react";
import { DateTime } from "luxon";
import copyTextToClipboard from "copy-text-to-clipboard";
import toast from "react-hot-toast";

export const RecentOrderCard = ({ orderList, $reloadAction }) => {
  const navigate = useNavigate();

  return (
    <OverviewCardBox
      icon={<IconBox strokeWidth={1.5} />}
      leftVal={"Recent Orders"}
      footer={"Orders"}
      $reloadAction={$reloadAction}
      $footerAction={() => navigate("/dashboard/orders")}
      className={"bg-offWhite"}
    >
      {orderList.length ? (
        <div className="grid grid-flow-row-dense gap-4">
          {orderList.slice(0, 5).map((order, i) => (
            <OrderDetailBox key={`order-${i}`} order={order} navigate={navigate} />
          ))}
        </div>
      ) : (
        <OrdersNotFound />
      )}
    </OverviewCardBox>
  );
};

const OrderDetailBox = ({ order, navigate }) => {
  const $copyOrderId = () => {
    copyTextToClipboard(order._id);
    toast.success("Order ID (" + order?._id + ") copied");
  };
  return (
    <div className="flex justify-between items-center bg-white p-3 rounded-lg">
      <div className="flex items-center">
        <div className="bg-offWhite text-black h-[48px] w-[48px] flex items-center justify-center rounded-full">
          <IconPackage size={26} strokeWidth={1.5} />
        </div>
        <div className="ml-3 text-sm">
          <p className="uppercase">#{order._id}</p>
          <p className="text-gray-500">{DateTime.fromISO(order.createdAt).toLocaleString(DateTime.DATETIME_MED)}</p>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-3">
        <IconCopy strokeWidth={1.25} className="cursor-pointer" onClick={$copyOrderId} />
        <IconFileSymlink
          strokeWidth={1.25}
          className="cursor-pointer"
          onClick={() => navigate("/dashboard/orders/" + order._id)}
        />
      </div>
    </div>
  );
};

const OrdersNotFound = () => {
  return (
    <div className="bg-gray-100 px-5 py-8 flex flex-col items-center justify-center flex-1 h-full">
      <IconAlertCircle strokeWidth={1} size={"4.5rem"} className="text-accent-500" />
      <p className="mt-4">Orders not found</p>
      <p className="text-sm text-gray-500 max-w-[300px] text-center">No orders appear to be placed with the store.</p>
    </div>
  );
};
