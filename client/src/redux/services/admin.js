import axios from "axios";
const URL = import.meta.env.VITE_URL;
const API = `${URL}/api/v1/admin`;

export const GET_ALL_STORE_ORDERS = async () => {
  const { data } = await axios.get(API + "/order");
  return data;
};
export const GET_ORDER_DETAILS = async (orderId) => {
  const { data } = await axios.get(API + "/order/" + orderId);
  return data;
};
export const UPDATE_ORDER_STATE = async ({ orderId, state }) => {
  const { data } = await axios.put(API + "/order/status/" + orderId, {
    updateStateTo: state,
  });
  return data;
};
export const GET_ALL_STORE_USERS = async () => {
  const { data } = await axios.get(API + "/users");
  return data;
};
export const GET_USER_PAYMENT_PREFERENCE = async () => {
  const { data } = await axios.get(API + "/order/stats");
  return data;
};
