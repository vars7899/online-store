import { useLocation, useNavigate } from "react-router-dom";
import { userList } from "../../navigation/userList";

const UserNavigation = () => {
  const navigate = useNavigate();
  const location = useLocation();
  return (
    <div className="py-4 pr-8 grid gap-3">
      {userList.map((item, index) => (
        <div
          key={`user-details-navigation-option-${index}`}
          className={`cursor-pointer rounded-lg flex items-center py-4 px-6 ${
            location.pathname === item.path ? "bg-black text-white" : "hover:bg-gray-100"
          } `}
          onClick={() => navigate(item.path)}
        >
          <div>{item.icon}</div>
          <p className="text-lg ml-3">{item.name}</p>
        </div>
      ))}
    </div>
  );
};

export default UserNavigation;
