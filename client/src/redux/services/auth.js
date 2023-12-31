import axios from "axios";
const URL = import.meta.env.VITE_URL;
const API = `${URL}/api/v1/user`;

export const registerUser = async (formData) => {
  const { data } = await axios.post(API + "/register", formData);
  return data;
};
export const loginUser = async (formData) => {
  const { data } = await axios.post(API, formData);
  return data;
};
export const checkLoginStatus = async () => {
  const { data } = await axios.get(API + "/check-login-status");
  return data;
};
export const logoutUser = async () => {
  const { data } = await axios.get(API + "/logout");
  return data;
};
