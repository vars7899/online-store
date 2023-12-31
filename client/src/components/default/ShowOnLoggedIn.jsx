import { useSelector } from "react-redux";

export const ShowOnLoggedIn = ({ children }) => {
  const { isLoggedIn } = useSelector((state) => state.auth);

  if (isLoggedIn) {
    return children;
  }
  return null;
};
