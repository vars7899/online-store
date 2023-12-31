import { IconPackages, IconPercentage, IconPigMoney, IconTrafficLights, IconUser } from "@tabler/icons-react";
import { AnalysisCard } from "./AnalysisCard";
import { useSelector } from "react-redux";
import { useCallback } from "react";
import {
  getAverageOrderPercentageChange,
  getAverageOrderPrice,
  getAverageOrderPriceLifeSpanArray,
  getSalesArray,
  getTotalRevenue,
  getUserRoleCount,
} from "../../../functions/DashboardAnalysis";

export const AnalysisCluster = ({ activeVisitor }) => {
  const { orderList, userList } = useSelector((state) => state.dashboard);

  // Analysis
  const averageOrderPrice = useCallback(() => getAverageOrderPrice(orderList), [orderList]);
  const averageOrderPercentage = useCallback(() => getAverageOrderPercentageChange(orderList), [orderList]);
  const averageOrderPriceLifeSpanArray = useCallback(() => getAverageOrderPriceLifeSpanArray(orderList), [orderList]);
  const totalRevenue = useCallback(() => getTotalRevenue(orderList), [orderList]);

  return (
    <div className="grid grid-cols-5 gap-2">
      <AnalysisCard
        title={"Average Order Price"}
        icon={<IconPigMoney strokeWidth={1.5} />}
        iconClassName={"bg-offWhite text-black"}
        value={Number(averageOrderPrice()).toFixed(3)}
        stat={"vs last month"}
        statPercentage={averageOrderPercentage() + " %"}
        graphData={averageOrderPriceLifeSpanArray()}
        graphLineColor={"black"}
        graphShadeColor={"#f1f1f1"}
        className="bg-white"
      />
      <AnalysisCard
        title={"Total Sales"}
        icon={<IconPercentage strokeWidth={1.5} />}
        iconClassName={"bg-offWhite text-black"}
        value={Number(totalRevenue()).toFixed(3)}
        stat={"Life time sales"}
        graphData={getSalesArray(orderList)}
        graphLineColor={"black"}
        graphShadeColor={"#f1f1f1"}
        className="bg-white"
      />
      <AnalysisCard
        title={"Website traffic"}
        icon={<IconTrafficLights strokeWidth={1.5} />}
        iconClassName={"bg-offWhite text-black"}
        value={activeVisitor}
        stat={"Active user traffic"}
        graphData={[activeVisitor]}
        graphLineColor={"black"}
        graphShadeColor={"#f1f1f1"}
        className="bg-white"
      />
      <AnalysisCard
        title={"Active Orders"}
        icon={<IconPackages strokeWidth={1.5} />}
        iconClassName={"bg-offWhite text-black"}
        value={orderList.length ? orderList.length : 0}
        stat={"Life time orders"}
        graphData={averageOrderPriceLifeSpanArray()}
        graphLineColor={"black"}
        graphShadeColor={"#f1f1f1"}
        className="bg-white"
      />
      <AnalysisCard
        title={"Customer Base"}
        icon={<IconUser strokeWidth={1.5} />}
        iconClassName={"bg-offWhite text-black"}
        value={userList.length ? userList.length : 0}
        stat={"May include unverified"}
        graphData={getUserRoleCount(userList)}
        graphLineColor={"black"}
        graphShadeColor={"#f1f1f1"}
        className="bg-white"
      />
    </div>
  );
};
