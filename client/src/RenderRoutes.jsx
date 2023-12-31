import { useSelector } from "react-redux";
import { Route, Routes } from "react-router-dom";
import Screens from "./screens";
import AppRoutes from "./AppRoutes";

export const RenderRoutes = () => {
  const { isLoggedIn } = useSelector((state) => state.auth);

  return (
    <Routes>
      {AppRoutes.map((route, index) => {
        if (route.isPrivate) {
          return isLoggedIn ? (
            <Route key={index} path={route.path} element={route.element} />
          ) : (
            <Route key={index} path={route.path} element={<div>Member Access only</div>} />
          );
        } else if (route.isPrivate === false) {
          return <Route key={index} path={route.path} element={route.element} />;
        } else {
          // >> return page not found or member access page
          return <Route path="/" element={<Screens.Home.Landing />} />;
        }
      })}
    </Routes>
  );
};
