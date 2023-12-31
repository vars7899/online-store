import { IconInfoOctagon } from "@tabler/icons-react";

export const OrderInformationContainerHeading = ({ title, opt }) => {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center justify-start">
        <p className="font-semibold text-lg tracking-wide mr-1">{title}</p>
        <IconInfoOctagon size={20} className="text-gray-600" strokeWidth={1.5} />
      </div>
      {opt ? <div>{opt}</div> : null}
    </div>
  );
};
