import { IconChartInfographic, IconCirclesRelation, IconGeometry, IconTimeline } from "@tabler/icons-react";
import React from "react";

export const CompanyBenefits = () => {
  return (
    <div className="py-32 flex items-center justify-center">
      <div>
        <p className="font-semibold text-8xl">
          Having business equipment that complies with industrial standards is essential
        </p>
        <div className="grid grid-cols-4 mt-8">
          <div className="flex flex-col items-center justify-center py-24 border-r-2 border-dashed">
            <IconGeometry size={46} strokeWidth={1} />
            <p className="font-semibold text-xl mt-3">Innovative</p>
          </div>
          <div className="flex flex-col items-center justify-center py-24 border-r-2 border-dashed">
            <IconChartInfographic size={46} strokeWidth={1} />
            <p className="font-semibold text-xl mt-3">Experienced</p>
          </div>
          <div className="flex flex-col items-center justify-center py-24 border-r-2 border-dashed">
            <IconTimeline size={46} strokeWidth={1} />
            <p className="font-semibold text-xl mt-3">Reliable</p>
          </div>
          <div className="flex flex-col items-center justify-center py-24">
            <IconCirclesRelation size={46} strokeWidth={1} />
            <p className="font-semibold text-xl mt-3">Collaborative</p>
          </div>
        </div>
      </div>
    </div>
  );
};
