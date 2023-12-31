import { IconArrowRight, IconPackages } from "@tabler/icons-react";
import { colorSelector } from "../../Order";
import { Tag } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { OverviewCardBox, OverviewCardContainer } from "./OverviewCardContainer";

export const OrderAnalysis = () => {
  const navigate = useNavigate();
  return (
    <OverviewCardBox
      icon={<IconPackages strokeWidth={1.5} />}
      leftVal={"Order Overview"}
      showFooter={false}
      className={"bg-white"}
    >
      <div className="grid grid-cols-5 gap-2">
        <OrderTypeCard title={"Pending/Unpaid"} value={234} />
        <OrderTypeCard title={"Paid"} value={234} />
        <OrderTypeCard title={"Processing"} value={234} />
        <OrderTypeCard title={"Shipped"} value={234} />
        <OrderTypeCard title={"Out for Delivery"} value={234} />
        <OrderTypeCard title={"Delivered"} value={234} />
        <OrderTypeCard title={"Completed"} value={234} />
        <OrderTypeCard title={"Canceled"} value={234} />
        <OrderTypeCard title={"On Hold"} value={234} />
        <div
          className="rounded-lg flex items-center justify-center text-xs cursor-pointer bg-offWhite"
          onClick={() => navigate("/dashboard/orders")}
        >
          <p>View All Orders</p>
          <IconArrowRight size={16} className="ml-1" />
        </div>
      </div>
    </OverviewCardBox>
  );
};

const OrderTypeCard = ({ title, value }) => {
  return (
    <div className="rounded-lg bg-offWhite p-3 relative overflow-hidden">
      <div className="h-5 w-5 bg-white rounded-full absolute top-[50%] right-0 translate-x-1/2 -translate-y-1/2"></div>
      <div className="h-5 w-5 bg-white rounded-full absolute top-[50%] left-0 -translate-x-1/2 -translate-y-1/2"></div>
      <p className="text-xs w-full text-black text-center">{title}</p>
      <p className="pt-2 flex items-center justify-center text-black-200 font-semibold">{value}</p>
    </div>
  );
};
