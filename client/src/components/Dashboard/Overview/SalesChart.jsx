import { IconReportAnalytics } from "@tabler/icons-react";
import { OverviewCardBox } from "./OverviewCardContainer";
import { useSelector } from "react-redux";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { getSalesGraphData } from "../../../functions/DashboardAnalysis";
import { useState } from "react";

const SalesChart = () => {
  const salesPeriodOptions = [
    { title: "1D", value: 1 },
    { title: "5D", value: 5 },
    { title: "1M", value: 30 },
    { title: "6M", value: 180 },
    { title: "1Y", value: 365 },
  ];
  const [salesPeriod, setSalesPeriod] = useState(salesPeriodOptions[1].value);
  const { orderList } = useSelector((state) => state.dashboard);

  return (
    <OverviewCardBox icon={<IconReportAnalytics />} leftVal={"Sales Overview"} className={"bg-white"}>
      <div className="grid grid-cols-5 gap-2 bg-offWhite rounded-lg p-2 mb-4">
        {salesPeriodOptions.map((opt) => (
          <div
            className={`place-self-center  w-full rounded-lg py-1 text-center cursor-pointer ${
              salesPeriod === opt.value ? "bg-black text-white" : "bg-white"
            }`}
            onClick={() => setSalesPeriod(opt.value)}
          >
            {opt.title}
          </div>
        ))}
      </div>
      <div className="h-[300px] w-full">
        <ResponsiveContainer>
          <LineChart
            data={getSalesGraphData(orderList, salesPeriod)}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey={"date"} hide />
            <Tooltip />
            {/* <Legend /> */}
            <Line type="monotone" dataKey="sale" stroke="#232323" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </OverviewCardBox>
  );
};

export default SalesChart;
