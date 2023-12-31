import { lazy, Suspense } from "react";
import Screens from "./screens";

const StoreSetting = lazy(() => import("./screens/Dashboard/StoreSetting"));

const Suspend = ({ children, fallback }) => <Suspense fallback={fallback}>{children}</Suspense>;

const AppRoutes = [
  // >> Public Routes
  { path: "/", element: <Screens.Home.Landing />, isPrivate: false },
  { path: "/components", element: <Screens.Home.Components />, isPrivate: false },
  { path: "/components/:productId", element: <Screens.Home.ProductDetailsScreen />, isPrivate: false },
  { path: "/register", element: <Screens.Authentication.Register />, isPrivate: false },
  { path: "/verify", element: <Screens.Authentication.VerifyEmail />, isPrivate: false },
  { path: "/login", element: <Screens.Authentication.Login />, isPrivate: false },
  // >> Private Routes
  { path: "/user/cart", element: <Screens.Home.Cart />, isPrivate: true },
  { path: "/user/profile", element: <Screens.User.Profile />, isPrivate: true },
  { path: "/user/security", element: <Screens.User.UserPrivacyAndSecurity />, isPrivate: true },
  { path: "/user/wishlist", element: <Screens.User.UserWishlist />, isPrivate: true },
  { path: "/user/orders", element: <Screens.User.UserOrders />, isPrivate: true },
  { path: "/user/wallet", element: <Screens.User.StoreWallet />, isPrivate: true },
  // >> Order Routes
  { path: "/order/new-order", element: <Screens.Order.NewOrderDetails />, isPrivate: true },
  { path: "/order/review-order", element: <Screens.Order.ReviewOrderDetails />, isPrivate: true },
  { path: "/order/order-confirmation/:orderId", element: <Screens.Order.OrderConfirmation />, isPrivate: true },
  // >> Admin Private Routes
  { path: "/dashboard/overview", element: <Screens.Dashboard.Overview />, isPrivate: true },
  { path: "/dashboard/store", element: <Suspend children={<StoreSetting />} />, isPrivate: true },
  { path: "/dashboard/products", element: <Screens.Dashboard.ProductList />, isPrivate: true },
  { path: "/dashboard/products/category", element: <Screens.Dashboard.ProductCategory />, isPrivate: true },
  { path: "/dashboard/products/add-new-product", element: <Screens.Dashboard.AddNewProduct />, isPrivate: true },
  { path: "/dashboard/products/:productId", element: <Screens.Dashboard.ProductDetails />, isPrivate: true },
  { path: "/dashboard/orders", element: <Screens.Dashboard.OrdersList />, isPrivate: true },
  { path: "/dashboard/orders/:orderId", element: <Screens.Dashboard.OrderDetails />, isPrivate: true },
  { path: "/dashboard/users", element: <Screens.Dashboard.UserList />, isPrivate: true },
];

export default AppRoutes;
