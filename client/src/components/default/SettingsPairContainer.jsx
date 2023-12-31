import React from "react";

export const SettingsPairContainer = ({ title, desc, children, className }) => {
  return (
    <div className={`${className} py-4 grid xl:grid-cols-[420px,_1fr] gap-4 xl:gap-10`}>
      <div>
        <p className="font-medium capitalize">{title}</p>
        <p className="text-black/40 text-sm mt-1">{desc}</p>
      </div>
      <div>{children}</div>
    </div>
  );
};
