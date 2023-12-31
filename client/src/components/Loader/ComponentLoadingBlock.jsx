import { Spinner } from "@chakra-ui/react";
import React from "react";

export const ComponentLoadingBlock = ({ className }) => {
  return (
    <div className={`flex flex-col items-center justify-center ${className}`}>
      <Spinner size={"xl"} color="accent.500" thickness="3px" speed="0.35s" />
      <p className="mt-4 text-gray-500 text-sm animate-pulse">Loading ....</p>
    </div>
  );
};
