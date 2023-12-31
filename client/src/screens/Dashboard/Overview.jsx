import { useDispatch, useSelector } from "react-redux";
import { Components, Layouts } from "../../global";
import { dashboardThunkActions as DBT } from "../../redux/thunkActions";
import { Suspense, lazy, useCallback, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { RESET_DASHBOARD } from "../../redux/features/dashboardSlice";
import io from "socket.io-client";
import { getAverageOrderPrice } from "../../functions/DashboardAnalysis";
const URL = import.meta.env.VITE_URL;

const SalesChartCard = lazy(() => import("../../components/Dashboard/Overview/SalesChart"));

const socket = io(URL);

export const Overview = () => {
  const [visitorCount, setVisitorCount] = useState(0);
  const dispatch = useDispatch();
  const { userList, orderList, isError, message, isLoading, stats } = useSelector((state) => state.dashboard);

  const $initPageData = () => {
    dispatch(DBT.getAllStoreUsers());
    dispatch(DBT.getAllStoreOrders());
    dispatch(DBT.getOrdersStats());
  };

  useEffect(() => {
    $initPageData();
  }, []);

  // !! Handle Error
  useEffect(() => {
    if (isError) toast.error(message);
    dispatch(RESET_DASHBOARD());
  }, [dispatch, isError, message]);

  useEffect(() => {
    socket.on("updateVisitorCount", (count) => {
      console.log(count);
      setVisitorCount(count);
    });

    return () => {
      socket.disconnect();
    };
  }, [socket]);

  return (
    <Layouts.Dashboard className="bg-platinum">
      <div className="grid gap-2 ">
        <div>
          <Components.Dashboard.Overview.AnalysisCluster activeVisitor={visitorCount} />
        </div>
        <div className="grid grid-cols-[2fr,_1fr] gap-2">
          <Components.Dashboard.Overview.OrderAnalysis />
          <Components.Dashboard.Overview.UserPreferences
            paymentMethod={stats.paymentMethod}
            $reloadAction={() => {
              dispatch(DBT.getAllStoreOrders());
              toast("Reloading Orders....");
            }}
          />
        </div>
        <div className="grid grid-cols-3 gap-2">
          <Components.Dashboard.Overview.NewCustomerCard
            userList={userList}
            $reloadAction={() => {
              dispatch(DBT.getAllStoreUsers());
              toast("Reloading Users....");
            }}
          />
          <Components.Dashboard.Overview.RecentOrderCard
            orderList={orderList}
            $reloadAction={() => {
              dispatch(DBT.getAllStoreOrders());
              toast("Reloading Orders....");
            }}
          />
          <Suspense>
            <SalesChartCard />
          </Suspense>
        </div>
      </div>
    </Layouts.Dashboard>
  );
};
