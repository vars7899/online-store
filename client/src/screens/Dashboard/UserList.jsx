import { useDispatch, useSelector } from "react-redux";
import { Layouts, Components } from "../../global";
import { Button } from "@chakra-ui/react";
import { dashboardThunkActions } from "../../redux/thunkActions";
import { useEffect, Suspense, lazy } from "react";
import { IconRefresh } from "@tabler/icons-react";

export const UserList = () => {
  const dispatch = useDispatch();
  const { userList, isLoading, isError, message } = useSelector((state) => state.dashboard);

  function $initPage() {
    dispatch(dashboardThunkActions.GET_ALL_STORE_USERS());
  }

  useEffect(() => {
    $initPage();
  }, [dispatch]);

  return (
    <Layouts.Dashboard>
      <Components.Dashboard.PageHeadline
        headline={"Store Users"}
        desc={
          "In the store user section, you can review all user with their details. You can view and edit all the user details such as user name, role etc. Access to this area is limited. Only administrator can view this section. The changes you make will come to effect immediately."
        }
        action={
          <Button size={"sm"} variant={"outline"} leftIcon={<IconRefresh size={20} />} onClick={$initPage}>
            Reload
          </Button>
        }
      />

      <Components.Dashboard.Users.UserListTable userList={userList} isLoading={isLoading} />
    </Layouts.Dashboard>
  );
};
