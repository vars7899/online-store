export const InformationPair = ({ title, value, className }) => {
  return (
    <div className={`flex items-center justify-between capitalize ${className}`}>
      <p>{title}</p>
      <p>{value}</p>
    </div>
  );
};
