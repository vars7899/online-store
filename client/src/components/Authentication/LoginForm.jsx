import { useEffect } from "react";
import { FormControl, FormLabel, Input, FormHelperText, Button, FormErrorMessage } from "@chakra-ui/react";
import { toast } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { RESET_AUTH } from "../../redux/features/authSlice";
import { Link, useNavigate } from "react-router-dom";
import { authThunkActions as ATA } from "../../redux/thunkActions";
import * as Yup from "yup";
import { useFormik } from "formik";

export const LoginForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoading, isSuccess, isError, message, isLoggedIn } = useSelector((state) => state.auth);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Invalid email").required("Email is required"),
      password: Yup.string().required("Password is required"),
    }),
    onSubmit: (values) => {
      dispatch(ATA.LOGIN_USER(values));
      formik.resetForm();
    },
  });

  useEffect(() => {
    if (isSuccess && isLoggedIn) navigate("/");
    if (isError) toast.error(message);
    dispatch(RESET_AUTH());
  }, [isSuccess, isError, message, navigate, isLoggedIn]);

  return (
    <div>
      <div className="flex flex-col items-start justify-start py-8">
        <p className="text-3xl xl:text-5xl font-semibold mb-2 xl:mb-4">Welcome!</p>
        <p className="text-sm xl:text-base text-black/60">
          Glad to see you back. Please fill in your credentials to proceed or
          <Link to="/register">
            <span className="px-[4px] text-purple">Register now</span>
          </Link>
        </p>
      </div>
      <form onSubmit={formik.handleSubmit}>
        <FormControl isInvalid={formik.errors.email && formik.touched.email}>
          <FormLabel>Email address</FormLabel>
          <Input type="email" value={formik.values.email} name="email" onChange={formik.handleChange} />
          <FormHelperText>We'll never share your email.</FormHelperText>
          <FormErrorMessage>{formik.errors.email}</FormErrorMessage>
        </FormControl>
        <FormControl mt={8} isInvalid={formik.errors.password && formik.touched.password}>
          <FormLabel>Password</FormLabel>
          <Input type="password" value={formik.values.password} name="password" onChange={formik.handleChange} />
          <FormErrorMessage>{formik.errors.password}</FormErrorMessage>
        </FormControl>
        <div className="flex justify-end w[100%] py-2">
          <Button size={{ base: "xs", sm: "md" }} variant={"link"} colorScheme="purple">
            Forget password?
          </Button>
        </div>
        <Button type="submit" w={"100%"} className="mt-10" colorScheme="purple" isLoading={isLoading}>
          Sign In
        </Button>
        <p className="mb-10 mt-2 text-sm text-neutral-400">
          By Signing you are accepting the eccent component terms and services.
        </p>
      </form>
    </div>
  );
};
