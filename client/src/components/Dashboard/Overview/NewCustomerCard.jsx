import { Avatar } from "@chakra-ui/react";
import { IconAlertCircle, IconCopy, IconMail, IconUserBolt } from "@tabler/icons-react";
import copyTextToClipboard from "copy-text-to-clipboard";
import toast from "react-hot-toast";
import { OverviewCardBox, OverviewCardContainer } from "./OverviewCardContainer";
import { useNavigate } from "react-router-dom";

export const NewCustomerCard = ({ userList, $reloadAction }) => {
  const navigate = useNavigate();
  return (
    <OverviewCardBox
      icon={<IconUserBolt />}
      leftVal={"Customer List"}
      footer={"Customers"}
      $reloadAction={$reloadAction}
      $footerAction={() => navigate("/dashboard/users")}
      className={"bg-offWhite"}
    >
      <div className="flex-1">
        {/* Only display max of 5 users on the overview page */}
        {userList.length ? (
          <div>
            {userList.slice(0, 5).map((user, i) => (
              <UserDetailBox key={`user-${i}`} user={user} />
            ))}
          </div>
        ) : (
          <UserNotFound />
        )}
      </div>
    </OverviewCardBox>
  );
};

const UserDetailBox = ({ user }) => {
  let fullName = user.firstName + " " + user.lastName;

  const $copyUserEmail = () => {
    copyTextToClipboard(user.email);
    toast.success("User email (" + user?.email + ") copied");
  };
  const $copyUserId = () => {
    copyTextToClipboard(user._id);
    toast.success("User ID (" + user?._id + ") copied");
  };
  return (
    <div className="flex items-center justify-between p-3 bg-white rounded-lg">
      <div className="flex items-center">
        <Avatar name={fullName} bg="offWhite" color={"black"} />
        <div className="ml-3">
          <p>{fullName}</p>
          <p className="uppercase text-sm text-gray-500">#{user._id}</p>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-3 text-gray-500">
        <IconMail strokeWidth={1.5} className="cursor-pointer" onClick={$copyUserEmail} />
        <IconCopy strokeWidth={1.5} className="cursor-pointer" onClick={$copyUserId} />
      </div>
    </div>
  );
};

const UserNotFound = () => {
  return (
    <div className="bg-gray-100 px-5 py-8 flex flex-col items-center justify-center flex-1 h-full">
      <IconAlertCircle strokeWidth={1} size={"4.5rem"} className="text-accent-500" />
      <p className="mt-4">User not found</p>
      <p className="text-sm text-gray-500 max-w-[300px] text-center">No users appear to be registered on the store.</p>
    </div>
  );
};
