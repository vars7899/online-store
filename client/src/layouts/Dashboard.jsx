import { useSelector } from "react-redux";
import { Components } from "../global";

export const Dashboard = ({ children, className }) => {
  const { expandAdminSideBar } = useSelector((state) => state.app);

  return (
    <div
      className={`${className} grid ${
        expandAdminSideBar ? "grid-cols-[400px,_1fr]" : "grid-flow-col-dense"
      } h-[100vh] overflow-hidden`}
    >
      <Components.Dashboard.Sidebar />
      <div className="border-l-[1px] h-[100%] overflow-y-scroll">
        <Components.Dashboard.TopBar />
        <div className="min-h-[calc(100vh-80px)] flex flex-col p-2">{children}</div>
      </div>
    </div>
  );
};
