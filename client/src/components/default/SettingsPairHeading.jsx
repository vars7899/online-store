import React from "react";

export const SettingsPairHeading = ({ title, desc }) => {
  return (
    <div>
      <p className="font-medium">{title}</p>
      <p className="text-black/40">{desc}</p>
    </div>
  );
};
