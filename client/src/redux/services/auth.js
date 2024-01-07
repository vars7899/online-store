import axios from "axios";
const URL = import.meta.env.VITE_URL;
const API = `${URL}/api/v1/user`;

export const REGISTER_USER = async (formData) => {
  const { data } = await axios.post(API + "/register", formData);
  return data;
};
export const LOGIN_USER = async (formData) => {
  const { data } = await axios.post(API, formData);
  return data;
};
export const CHECK_LOGIN_STATUS = async () => {
  const { data } = await axios.get(API + "/check-login-status");
  return data;
};
export const LOGOUT_USER = async () => {
  const { data } = await axios.get(API + "/logout");
  return data;
};
