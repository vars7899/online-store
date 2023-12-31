import {
  IconBoxSeam,
  IconHeart,
  IconSmartHome,
  IconRadiusBottomLeft,
  IconBuildingStore,
  IconUser,
  IconPointFilled,
} from "@tabler/icons-react";

export const adminList = [
  {
    name: "Dashboard",
    icon: <IconSmartHome strokeWidth={1.5} />,
    path: "/dashboard/overview",
  },
  {
    name: "Store Settings",
    icon: <IconBuildingStore strokeWidth={1.5} />,
    path: "/dashboard/store",
  },
  {
    name: "Products",
    icon: <IconBoxSeam strokeWidth={1.5} />,
    path: "/dashboard/products",
    children: [
      {
        name: "Product List",
        icon: <IconPointFilled strokeWidth={1.5} />,
        path: "/dashboard/products",
      },
      {
        name: "Product Categories",
        icon: <IconPointFilled strokeWidth={1.5} />,
        path: "/dashboard/products/category",
      },
      {
        name: "Add Product",
        icon: <IconPointFilled strokeWidth={1.5} />,
        path: "/dashboard/products/add-new-product",
      },
    ],
  },
  {
    name: "Orders",
    icon: <IconHeart strokeWidth={1.5} />,
    path: "/dashboard/orders",
    children: [
      {
        name: "Order List",
        icon: <IconPointFilled strokeWidth={1.5} />,
        path: "/dashboard/orders",
      },
    ],
  },
  {
    name: "Users",
    icon: <IconUser strokeWidth={1.5} />,
    path: "/dashboard/users",
    children: [
      {
        name: "User List",
        icon: <IconPointFilled strokeWidth={1.5} />,
        path: "/dashboard/users",
      },
    ],
  },
];
