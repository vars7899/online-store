import React, { useEffect, useState } from "react";
import { FormControl, FormLabel, Input, FormHelperText, Button } from "@chakra-ui/react";
import { toast } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { LOGIN_USER, RESET_AUTH } from "../../redux/features/authSlice";
import { Link, useNavigate } from "react-router-dom";

const defaultFormData = {
  email: "",
  password: "",
};

export const LoginForm = () => {
  const [formData, setFormData] = useState(defaultFormData);
  const dispatch = useDispatch();
  const { isLoading, isSuccess, isError, message, isLoggedIn } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const updateFormData = (e) => {
    const { name, value } = e.target;
    setFormData((current) => ({ ...current, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      toast.error("Missing one or more required field, please try again");
      return;
    }

    await dispatch(LOGIN_USER(formData));
  };

  useEffect(() => {
    if (isSuccess && isLoggedIn) navigate("/");
    if (isError) toast.error(message);
    dispatch(RESET_AUTH());
  }, [isSuccess, isError, message, navigate, isLoggedIn]);
  return (
    <div>
      <div className="flex flex-col items-start justify-start py-8">
        <p className="text-3xl xl:text-4xl font-semibold mb-2 xl:mb-4">Welcome!</p>
        <p className="text-sm xl:text-base font-semibold text-black/60">
          Glad to see you back. Please fill in your credentials to proceed or
          <Link to="/register">
            <span className="px-[4px] font-bold text-orange-500">Register now</span>
          </Link>
        </p>
      </div>
      <form onSubmit={handleSubmit}>
        <FormControl isRequired>
          <FormLabel>Email address</FormLabel>
          <Input type="email" value={formData.email} name="email" onChange={updateFormData} />
          <FormHelperText>We'll never share your email.</FormHelperText>
        </FormControl>
        <FormControl mt={8} isRequired>
          <FormLabel>Password</FormLabel>
          <Input type="password" value={formData.password} name="password" onChange={updateFormData} />
        </FormControl>
        <div className="flex justify-end w[100%] py-2">
          <Button size={{ base: "xs", sm: "md" }} variant={"link"} colorScheme="blackAlpha">
            Forget password?
          </Button>
        </div>
        <Button type="submit" w={"100%"} className="my-10" colorScheme="orange" isLoading={isLoading}>
          Login
        </Button>
      </form>
    </div>
  );
};
