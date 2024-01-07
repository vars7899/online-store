import { Avatar, IconButton } from "@chakra-ui/react";
import { IconLayoutSidebarLeftExpand } from "@tabler/icons-react";
import { useDispatch, useSelector } from "react-redux";
import { UPDATE_ADMIN_SIDEBAR } from "../../redux/features/appSlice";

export const TopBar = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  return (
    <div className="bg-white">
      <div className="border-b-[1px] h-[80px] px-4 flex items-center justify-between">
        <div className="flex items-center justify-start">
          <IconButton
            icon={<IconLayoutSidebarLeftExpand />}
            variant={"outline"}
            onClick={() => dispatch(UPDATE_ADMIN_SIDEBAR())}
          />
          <div className="ml-4">
            <p className="text-lg">Dashboard</p>
            <p className="text-gray-400 text-sm">All Information about your store</p>
          </div>
        </div>
        {user ? (
          <div className="flex items-center">
            <Avatar bgColor={"offWhite"} color={"black"} name={`${user.firstName} ${user.lastName}`} />
            <div className="flex flex-col ml-2">
              <p className="">
                {user.firstName} {user.lastName}
              </p>
              <p className="capitalize text-sm text-gray-400">{user.role}</p>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
};
