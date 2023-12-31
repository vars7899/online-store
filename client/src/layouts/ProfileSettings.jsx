import { lazy, Suspense, useState } from "react";
import * as Layouts from "./";
import { SettingsHeading } from "../components/default";
const UserNavigation = lazy(() => import("../components/User/UserNavigation"));

export const ProfileSettings = ({ children }) => {
  const [expandList, setExpandList] = useState(false);

  const $updateExpandList = () => setExpandList((prev) => !prev);

  return (
    <Layouts.Basic>
      <div className="hidden border-b-[2px] border-dashed py-4 xl:flex items-center">
        <SettingsHeading title={"Settings"} desc={"Manage your account settings and preferences"} />
      </div>
      <div className="grid xl:grid-cols-[400px,_1fr] min-h-[800px]">
        <div className="hidden xl:block border-r-[2px] border-dashed">
          <Suspense>
            <UserNavigation />
          </Suspense>
        </div>
        <div className="py-4 xl:p-4">{children}</div>
      </div>
    </Layouts.Basic>
  );
};
