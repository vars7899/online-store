import { useState } from "react";
import * as Components from "../";
import { FormControl, FormLabel, Input, FormHelperText, Divider, Button, Tag } from "@chakra-ui/react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { IconAlertCircle, IconCircleCheck } from "@tabler/icons-react";
import { authThunkActions as ATA } from "../../redux/thunkActions";

export const PersonalInformationTab = ({ user }) => {
  const dispatch = useDispatch();
  const [userDetails, setUserDetails] = useState(user);
  const { isLoading } = useSelector((state) => state.auth);

  const $updateUserDetailsHandler = (e) => {
    const { name, value } = e.target;
    setUserDetails((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const $resetFormDataHandler = () => {
    setUserDetails(user);
  };

  const $saveNewUserDetailsHandler = () => {
    const { firstName, lastName, phone } = userDetails;

    if (!firstName || !lastName) {
      return toast.error(
        "It appears that one or more required fields are missing from the user details form. Please try again"
      );
    }
    if (!phone || phone.length < 10) {
      return toast.error("It appears that provide phone number is either missing or invalid. Please try again");
    }

    dispatch(ATA.UPDATE_USER_DETAILS(userDetails));
  };

  return (
    <div>
      <Components.Default.SettingsPairContainer
        title={"Personal details"}
        desc={
          "Please take a moment to update and make any necessary changes to your personal details within the system"
        }
      >
        <div>
          <div className="grid grid-cols-2 gap-4">
            <FormControl isRequired>
              <FormLabel>First Name</FormLabel>
              <Input
                type="text"
                name="firstName"
                value={userDetails.firstName}
                onChange={$updateUserDetailsHandler}
                placeholder="John"
              />
            </FormControl>
            <FormControl isRequired>
              <FormLabel>Last Name</FormLabel>
              <Input
                type="text"
                name="lastName"
                value={userDetails.lastName}
                onChange={$updateUserDetailsHandler}
                placeholder="Doe"
              />
            </FormControl>
          </div>
          <FormControl isRequired isReadOnly mt={4}>
            <FormLabel>Email</FormLabel>
            <Input type="text" name="email" value={userDetails.email} placeholder="johndoe@eccent.com" />
            <FormHelperText>Email associated to the user account cannot be updated.</FormHelperText>
          </FormControl>
          {user?.isVerified ? (
            <Tag mt={4} colorScheme="green" size={"lg"}>
              <IconCircleCheck size={20} className="mr-2" />
              <p>Verified User</p>
            </Tag>
          ) : (
            <Tag mt={4} colorScheme="red" size={"lg"}>
              <IconAlertCircle size={20} className="mr-2" />
              <p>Unverified User</p>
            </Tag>
          )}
        </div>
      </Components.Default.SettingsPairContainer>
      <Components.Default.SettingsPairContainer
        title={"Contact Information"}
        desc={"Please take a moment to update and make any necessary changes to your contact details within the system"}
        children={
          <FormControl isRequired>
            <FormLabel>Phone Number</FormLabel>
            <Input
              type="number"
              name="phone"
              value={userDetails.phone}
              onChange={$updateUserDetailsHandler}
              placeholder="+1 2345678910"
            />
          </FormControl>
        }
      />
      <Divider my={4} />
      <div className="flex items-center justify-end">
        <Button colorScheme="gray" variant={"outline"} mr={3} onClick={$resetFormDataHandler}>
          Cancel
        </Button>
        <Button colorScheme="blue" variant={"outline"} onClick={$saveNewUserDetailsHandler} isLoading={isLoading}>
          Save Changes
        </Button>
      </div>
    </div>
  );
};
