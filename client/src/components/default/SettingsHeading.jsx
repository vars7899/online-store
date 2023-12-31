export const SettingsHeading = ({ title, desc, action, className }) => {
  return (
    <div className={`flex justify-between items-center ${className}`}>
      <div>
        <p className="text-base xl:text-xl">{title}</p>
        <p className="text-xs xl:text-sm text-gray-400">{desc}</p>
      </div>
      {action ? <div>{action}</div> : null}
    </div>
  );
};
