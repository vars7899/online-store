import { Button, Divider, FormControl, FormHelperText, FormLabel, Input } from "@chakra-ui/react";
import { Layouts } from "../../global";
import { useEffect, useState } from "react";
import { IconArrowRight } from "@tabler/icons-react";
import { Link, useNavigate } from "react-router-dom";
import { passwordStrength } from "check-password-strength";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import isValidEmail from "../../functions/isValidEmail";
import { phone as isValidPhone } from "phone";
import { REGISTER_USER, RESET_AUTH } from "../../redux/features/authSlice";

const defaultUserDetails = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  password: "",
  confirmPassword: "",
};
export const Register = () => {
  // >> States
  const [userDetails, setUserDetails] = useState(defaultUserDetails);
  // >> Init
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isLoading, isError, message, isSuccess } = useSelector((state) => state.auth);
  // >> Update the user details
  const $updateUserDetailsHandler = (e) => {
    const { name, value } = e.target;
    setUserDetails((prev) => ({ ...prev, [name]: value }));
  };
  // >> Validate and submit register new user request
  const $registerNewUserHandler = () => {
    const { firstName, lastName, email, password, confirmPassword, phone } = userDetails;

    if (!firstName || !lastName || !email || !password || !confirmPassword || !phone) {
      return toast.error("Missing one or more required field in the profile. Please try again");
    }
    if (!isValidEmail(email)) {
      return toast.error("An invalid email address has been provided. Please provide a valid email address");
    }
    if (!isValidPhone(phone).isValid) {
      return toast.error("An invalid phone number has been provided. Please provide a valid phone number");
    }
    if (password !== confirmPassword) {
      return toast.error("Provided password does not match. please try again");
    }
    const calcPassStrength = passwordStrength(password);
    if (
      password.length < 8 ||
      !calcPassStrength.contains.includes("lowercase") ||
      !calcPassStrength.contains.includes("uppercase") ||
      !calcPassStrength.contains.includes("symbol") ||
      !calcPassStrength.contains.includes("number")
    ) {
      return toast.error(
        "The password provided is not strong. Passwords should contain at least eight characters and include uppercase letters, lowercase letters, symbols, and numbers."
      );
    }
    dispatch(REGISTER_USER(userDetails));
  };
  // >> Side-effect
  useEffect(() => {
    if (isError) {
      toast.error(message);
    }
    if (isSuccess) {
      setUserDetails(defaultUserDetails);
      navigate("/");
    }
    dispatch(RESET_AUTH());
  });

  return (
    <Layouts.Auth>
      <div className="flex flex-col justify-between h-[100%]">
        <div>
          <p className="text-3xl">Let's get Started</p>
          <p className="text-gray-500 mt-2">
            Creating an account with Eccent components is as easy as filling out the form.
          </p>
        </div>
        <form>
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
          <FormControl isRequired mt={6}>
            <FormLabel>Email</FormLabel>
            <Input
              type="text"
              name="email"
              value={userDetails.email}
              onChange={$updateUserDetailsHandler}
              placeholder="johndoe@eccent.com"
            />
            <FormHelperText>You will receive a verification pin via email if you provide a valid email.</FormHelperText>
          </FormControl>
          <FormControl isRequired mt={6}>
            <FormLabel>Phone Number</FormLabel>
            <Input
              type="number"
              name="phone"
              value={userDetails.phone}
              onChange={$updateUserDetailsHandler}
              placeholder="6041231234"
            />
          </FormControl>
          <FormControl isRequired mt={6}>
            <FormLabel>Password</FormLabel>
            <Input
              type="password"
              name="password"
              value={userDetails.password}
              onChange={$updateUserDetailsHandler}
              placeholder="******************"
            />
          </FormControl>
          <FormControl isRequired mt={6}>
            <FormLabel>Confirm Password</FormLabel>
            <Input
              type="password"
              name="confirmPassword"
              value={userDetails.confirmPassword}
              onChange={$updateUserDetailsHandler}
              placeholder="******************"
            />
          </FormControl>
          <Button
            rightIcon={<IconArrowRight className="animate-pulse" />}
            mt={10}
            w={"full"}
            size={"lg"}
            colorScheme="accent"
            onClick={$registerNewUserHandler}
            isLoading={isLoading}
          >
            Get Started
          </Button>
        </form>
        <div>
          <Divider my={4} />
          <div className="flex items-center justify-center">
            <p className="mr-2">Already a member</p>
            <Link>Login?</Link>
          </div>
        </div>
      </div>
    </Layouts.Auth>
  );
};
