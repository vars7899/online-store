import { IconCircleCheckFilled } from "@tabler/icons-react";

export const SelectionBox = ({ onClick, children, selected }) => {
  return (
    <div
      className={`relative border-[1.5px] rounded-lg px-6 py-4 cursor-pointer hover:border-accent-400  mr-3 mt-2 ${
        selected ? "border-[2.5px] border-accent-500 bg-accent-50/5" : null
      }`}
      onClick={onClick}
    >
      {children}
      <span
        className={`absolute -top-[12px] -right-[12px] rounded-full ${
          selected ? "text-accent-500 bg-white" : "hidden"
        }`}
      >
        <IconCircleCheckFilled size={30} />
      </span>
    </div>
  );
};
