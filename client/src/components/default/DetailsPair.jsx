export const DetailsPair = ({ title, value, className }) => {
  return (
    <div className={`text-sm flex items-center justify-between mb-2 ${className}`}>
      <p className="capitalize">{title}</p>
      <p className="capitalize">{value}</p>
    </div>
  );
};
