import React from "react";
import ReactPlayer from "react-player";
import v1 from "../../assets/v2.mp4";
import { IconArrowUpRight } from "@tabler/icons-react";
import { motion } from "framer-motion";

export const Hero = () => {
  return (
    <div className="h-[calc(100vh-76px)]">
      <div className="pt-16 flex justify-between cursor-default">
        <p className="text-9xl font-bowlby flex flex-col">
          <motion.span
            initial={{ color: "black" }}
            animate={{ color: ["#000", "#EF8A06", "#000", "#EF8A06"] }}
            transition={{ ease: "linear", repeat: Infinity, duration: 6, repeatType: "reverse" }}
          >
            Eccent*
          </motion.span>
          <span>Components</span>
        </p>
        <div className="flex flex-col justify-between">
          <p className="max-w-md text-lg">
            Our company has invested in developing a wide range of products and services in our capacity as a solution
            provider since 1999.
          </p>
          <div className="flex items-center cursor-pointer">
            <div className="border-2 rounded-full border-dashed p-4">
              <IconArrowUpRight />
            </div>
            <p className="font-semibold text-lg ml-4">View Catalog</p>
          </div>
        </div>
      </div>
      <div className="relative mt-20 h-[500px] w-[100%] bg-black overflow-hidden grayscale">
        <ReactPlayer loop playing muted url={[v1]} width={"100%"} height={930} />
      </div>
    </div>
  );
};
