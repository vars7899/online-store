import { IconArrowUpRight } from "@tabler/icons-react";
import { motion } from "framer-motion";

const RoundButton = ({ title, onClick }) => {
  return (
    <div
      className="px-6 py-4 text-gray-500 border-2 border-dashed border-gray-300 flex items-center justify-between rounded-full text-sm cursor-pointer"
      onClick={onClick}
    >
      <p className="tracking-wide mr-2 whitespace-nowrap">{title}</p>
      <IconArrowUpRight strokeWidth={1} />
    </div>
  );
};

export default RoundButton;
