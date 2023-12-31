import axios from "axios";
const URL = import.meta.env.VITE_URL;
const API = `${URL}/api/v1/admin`;

export const getAllStoreOrders = async () => {
  const { data } = await axios.get(API + "/order");
  return data;
};
export const getOrderDetails = async (orderId) => {
  const { data } = await axios.get(API + "/order/" + orderId);
  return data;
};
export const updateOrderState = async ({ orderId, state }) => {
  const { data } = await axios.put(API + "/order/status/" + orderId, {
    updateStateTo: state,
  });
  return data;
};
export const getAllUsers = async () => {
  const { data } = await axios.get(API + "/users");
  return data;
};
export const getOrdersStats = async () => {
  const { data } = await axios.get(API + "/order/stats");
  return data;
};
