import { useSelector } from "react-redux";

export const ShowToUnAuthenticated = ({ children }) => {
  const { isLoggedIn } = useSelector((state) => state.auth);
  return <>{!isLoggedIn ? children : null}</>;
};
