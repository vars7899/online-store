import { useSelector } from "react-redux";

export const ShowOnLoggedOut = () => {
  const { isLoggedIn } = useSelector((state) => state.auth);

  if (!isLoggedIn) {
    return children;
  }
  return null;
};
