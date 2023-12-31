import { IconHelpCircle } from "@tabler/icons-react";

export const PageHeadline = ({ headline, desc, action }) => {
  return (
    <div>
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <p className="text-lg mr-2">{headline}</p>
          <IconHelpCircle size={18} />
        </div>
        <div>{action ? action : null}</div>
      </div>
      <p className="mt-1 text-gray-400 font-extralight text-sm">{desc}</p>
    </div>
  );
};
