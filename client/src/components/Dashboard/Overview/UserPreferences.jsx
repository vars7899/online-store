import { IconCreditCard, IconDotsVertical, IconHomeDollar } from "@tabler/icons-react";
import { OverviewCardBox, OverviewCardContainer } from "./OverviewCardContainer";
import { PieChart, Pie, Cell, Legend } from "recharts";

const data = [
  { name: "Group A", value: 400 },
  { name: "Group B", value: 300 },
  { name: "Group C", value: 300 },
  { name: "Group D", value: 200 },
];
const COLORS = ["#0088FE", "#00C49F", "#EF8A06", "#7eff42"];

const IconDefaultProps = {
  size: 20,
  strokeWidth: 1.5,
};

export const UserPreferences = ({ paymentMethod, $reloadAction }) => {
  return (
    <OverviewCardBox
      leftVal={"Customer Preferences"}
      icon={<IconHomeDollar strokeWidth={1.5} />}
      $reloadAction={$reloadAction}
      className={"bg-offWhite"}
    >
      <section className="grid grid-cols-3 gap-2 h-full">
        <DetailCard title={"Credit Card"} subtitle={344} icon={<IconCreditCard {...IconDefaultProps} />} />
        <DetailCard title={"Cash on Delivery"} subtitle={344} icon={<IconCreditCard {...IconDefaultProps} />} />
        <DetailCard title={"Store Wallet"} subtitle={344} icon={<IconCreditCard {...IconDefaultProps} />} />
      </section>
    </OverviewCardBox>
  );
};

const DetailCard = ({ title, subtitle, icon, $redirectAction }) => {
  return (
    <div className="flex flex-col justify-between rounded-lg h-full p-3 bg-white">
      <div>
        <p className="text-xs">{title}</p>
        <p className="mt-1">{subtitle}</p>
      </div>
      <div className="flex items-center justify-between mt-5">
        <div className="bg-offWhite rounded-full p-2">{icon}</div>
        <div className="p-2">
          <IconDotsVertical {...IconDefaultProps} />
        </div>
      </div>
    </div>
  );
};

{
  /* <div className="flex-1">
        <div className="px-5 py-4">{paymentMethod && <StatWithChartBox data={paymentMethod} />}</div>
      </div> */
}

const StatWithChartBox = ({ data }) => {
  return (
    <div>
      <PieChart width={400} height={300}>
        <Pie
          data={data}
          startAngle={180}
          endAngle={0}
          innerRadius={60}
          outerRadius={80}
          fill="#8884d8"
          paddingAngle={5}
          dataKey="amount"
          label
        >
          {data.map((entry, index) => (
            <Cell name={entry.method} key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Legend layout="vertical" align="right" verticalAlign="middle" />
      </PieChart>
    </div>
  );
};
