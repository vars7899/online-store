import { IconBleachNoChlorine, IconChevronDown, IconChevronUp, IconLogout } from "@tabler/icons-react";
import { adminList } from "../../navigation/adminList";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const NavigationButton = ({ item, onClick, expand }) => {
  return (
    <div
      className={`cursor-pointer rounded-lg flex items-center py-4 px-3 select-none ${
        location.pathname === item.path ? "bg-white text-black" : "hover:bg-white text-gray-500"
      } `}
      onClick={onClick}
    >
      <div>{item.icon}</div>
      {expand && <p className="ml-3">{item.name}</p>}
    </div>
  );
};
const ChildrenList = ({ item, expand }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const updateShow = () => setShow((prev) => !prev);

  useEffect(() => {
    if (item.children.filter((sub) => sub.path === location.pathname).length) {
      setShow(true);
    }
  }, [location]);

  return (
    <div className="flex flex-col h-[100%]">
      <div
        className={`flex items-center justify-between w-[100%] cursor-pointer rounded-lg py-4 px-3 ${
          location.pathname.includes(item.path) ? "bg-white text-black" : "hover:bg-white text-gray-500"
        }`}
        onClick={() => (expand ? updateShow() : navigate(item.path))}
      >
        <div className="flex items-center">
          <div>{item.icon}</div>
          {expand && <p className="ml-3 select-none">{item.name}</p>}
        </div>
        {expand ? show ? <IconChevronUp /> : <IconChevronDown /> : null}
      </div>
      {expand && show ? (
        <div className="py-1 grid gap-1">
          {item.children
            ? item.children.map((sub, index) => (
                <NavigationButton key={`sub-${index}`} item={sub} onClick={() => navigate(sub.path)} expand={expand} />
              ))
            : null}
        </div>
      ) : null}
    </div>
  );
};
const AdminBrandLogo = ({ expand }) => {
  return (
    <div className="h-[80px] flex items-center">
      <IconBleachNoChlorine size={48} strokeWidth={1} className="text-accent-500" />
      {expand && (
        <div className="ml-2 flex flex-col items-start justify-center cursor-pointer">
          <p className="text-[1.15rem] leading-none">Eccent</p>
          <p className="text-[1.15rem] leading-none">Components</p>
        </div>
      )}
    </div>
  );
};
export const Sidebar = () => {
  const navigate = useNavigate();
  const { expandAdminSideBar } = useSelector((state) => state.app);

  return (
    <div className="px-4 h-[100vh] flex flex-col bg-white">
      <AdminBrandLogo expand={expandAdminSideBar} />
      <div className="flex flex-col justify-between flex-1">
        <div className="grid gap-1">
          {adminList.map((item, index) =>
            !item.children ? (
              <NavigationButton
                key={`nav-${index}`}
                item={item}
                onClick={() => navigate(item.path)}
                expand={expandAdminSideBar}
              />
            ) : (
              <ChildrenList key={`nav-${index}`} item={item} expand={expandAdminSideBar} />
            )
          )}
        </div>
        <div className="mb-4">
          <NavigationButton
            item={{
              name: "Logout",
              icon: <IconLogout />,
            }}
            onClick={() => alert("logout")}
          />
        </div>
      </div>
    </div>
  );
};
