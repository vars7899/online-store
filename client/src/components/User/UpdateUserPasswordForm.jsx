import { Button, Divider, FormControl, FormHelperText, FormLabel, Input } from "@chakra-ui/react";
import * as Components from "../";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { passwordStrength } from "check-password-strength";
import toast from "react-hot-toast";
import * as authActions from "../../redux/features/authSlice";
import { PasswordChecklist } from "./PasswordChecklist";

const defaultUserPasswordDetails = {
  oldPassword: "",
  newPassword: "",
  newCfPassword: "",
};
export const UpdateUserPasswordForm = ({ isLoading }) => {
  const dispatch = useDispatch();
  const [userPasswordDetails, setUserPasswordDetails] = useState(defaultUserPasswordDetails);

  const $updateUserPasswordDetailsHandler = (e) => {
    const { name, value } = e.target;
    setUserPasswordDetails((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const $resetFormDataHandler = () => {
    setUserPasswordDetails(defaultUserPasswordDetails);
  };

  const $saveNewUserPasswordDetailsHandler = () => {
    const { oldPassword, newPassword, newCfPassword } = userPasswordDetails;

    if (!oldPassword || !newPassword || !newCfPassword) {
      return toast.error(
        "It appears that one or more required fields are missing from the user password details form. Please try again"
      );
    }
    if (newCfPassword !== newPassword) {
      return toast.error("It appears that new password and confirm new password do not match. Please try again");
    }
    if (passwordStrength(newCfPassword).id < 2) {
      return toast.error("It appears that new password is to weak, please choose a strong password");
    }

    dispatch(authActions.UPDATE_USER_PASSWORD(userPasswordDetails));
  };

  return (
    <section>
      <Components.Default.SettingsPairContainer
        title={"Personal details"}
        desc={"Please take a moment to update and make any necessary changes to your billing address within the system"}
      >
        <PasswordChecklist
          newPassword={userPasswordDetails.newPassword}
          newCfPassword={userPasswordDetails.newCfPassword}
        />
        <FormControl isRequired>
          <FormLabel>Current Password</FormLabel>
          <Input
            type="password"
            name="oldPassword"
            value={userPasswordDetails.oldPassword}
            placeholder="***************"
            onChange={$updateUserPasswordDetailsHandler}
          />
        </FormControl>
        <FormControl isRequired mt={4}>
          <FormLabel>New Password</FormLabel>
          <Input
            type="password"
            name="newPassword"
            value={userPasswordDetails.newPassword}
            placeholder="***************"
            onChange={$updateUserPasswordDetailsHandler}
          />
          <FormHelperText color={"blue.500"}>{passwordStrength(userPasswordDetails.newPassword).value}</FormHelperText>
        </FormControl>
        <FormControl isRequired mt={4}>
          <FormLabel>Confirm New Password</FormLabel>
          <Input
            type="password"
            name="newCfPassword"
            value={userPasswordDetails.newCfPassword}
            placeholder="***************"
            onChange={$updateUserPasswordDetailsHandler}
          />
          <FormHelperText color={"blue.500"}>
            {passwordStrength(userPasswordDetails.newCfPassword).value}
          </FormHelperText>
        </FormControl>
      </Components.Default.SettingsPairContainer>
      <Divider mb={3} />
      <div className="flex items-center justify-end">
        <Button colorScheme="gray" variant={"outline"} mr={3} onClick={$resetFormDataHandler}>
          Cancel
        </Button>
        <Button
          colorScheme="blue"
          variant={"outline"}
          onClick={$saveNewUserPasswordDetailsHandler}
          isLoading={isLoading}
        >
          Save Changes
        </Button>
      </div>
    </section>
  );
};
