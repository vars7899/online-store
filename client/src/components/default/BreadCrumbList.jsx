import { Breadcrumb, BreadcrumbItem, BreadcrumbLink } from "@chakra-ui/react";
import { useState } from "react";
import { useLocation } from "react-router-dom";

export const BreadCrumbList = ({ className }) => {
  const location = useLocation();
  const [path] = useState(() => {
    let pathname = location.pathname.split("/");
    pathname = pathname.slice(1);
    return pathname;
  });

  return (
    <div className={`text-sm text-gray-400 font-medium mb-2 ${className}`}>
      <Breadcrumb>
        {path.map((val) => (
          <BreadcrumbItem>
            <BreadcrumbLink className="capitalize">{val}</BreadcrumbLink>
          </BreadcrumbItem>
        ))}
      </Breadcrumb>
    </div>
  );
};
