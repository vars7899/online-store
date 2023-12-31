import * as Layouts from "../../layouts";
import * as Components from "../../components";
import { useSelector } from "react-redux";
import { Divider } from "@chakra-ui/react";

export const UserPrivacyAndSecurity = () => {
  const authState = useSelector((state) => state.auth);
  return (
    <Layouts.ProfileSettings>
      <Components.Default.SettingsHeading
        title={"Update Profile Password"}
        desc="Update and manage your account security details here."
      />
      <Divider mt={4} />
      <Components.User.UpdateUserPasswordForm user={authState.user} isLoading={authState.isLoading} />
    </Layouts.ProfileSettings>
  );
};
