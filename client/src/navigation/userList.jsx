import { IconBoxSeam, IconFingerprint, IconHeart, IconUser, IconWallet } from "@tabler/icons-react";

export const userList = [
  {
    name: "Personal Details",
    icon: <IconUser strokeWidth={1.5} />,
    path: "/user/profile",
  },
  {
    name: "Privacy & Security",
    icon: <IconFingerprint strokeWidth={1.5} />,
    path: "/user/security",
  },
  {
    name: "User Wishlist",
    icon: <IconHeart strokeWidth={1.5} />,
    path: "/user/wishlist",
  },
  {
    name: "Your Orders",
    icon: <IconBoxSeam strokeWidth={1.5} />,
    path: "/user/orders",
  },
  {
    name: "Wallet",
    icon: <IconWallet strokeWidth={1.5} />,
    path: "/user/wallet",
  },
];
