import LineGraph from "react-line-graph";

export const AnalysisCard = ({
  title,
  icon,
  graphData,
  statPercentage,
  stat,
  value,
  iconClassName,
  graphLineColor,
  graphShadeColor,
  className,
}) => {
  return (
    <div className={`overview-card p-4 grid grid-cols-[1fr,_0.35fr] ${className}`}>
      <div>
        <div className={`${iconClassName} rounded-lg p-2.5 w-min mb-2`}>{icon}</div>
        <p className="text-sm text-gray-500">{title}</p>
        <p className="text-xl my-1.5">{value}</p>
        <p className="text-xs">
          <span className={`font-semibold ${statPercentage > 0 ? "text-green-500" : "text-red-500"}`}>
            {statPercentage}
          </span>
          <span className="ml-1">{stat}</span>
        </p>
      </div>
      <div className="flex items-end">
        <LineGraph data={graphData} height={120} smoothing={0.2} accent={graphLineColor} fillBelow={graphShadeColor} />
      </div>
    </div>
  );
};
