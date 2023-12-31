import { useSelector } from "react-redux";

export const ShowToAuthenticated = ({ children }) => {
  const { isLoggedIn } = useSelector((state) => state.auth);
  return <>{isLoggedIn ? children : null}</>;
};
