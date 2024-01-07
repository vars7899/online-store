import axios from "axios";
const URL = import.meta.env.VITE_URL;
const API = `${URL}/api/v1/user/shipping-address`;

export const GET_ALL_SHIPPING_ADDRESS = async () => {
  const { data } = await axios.get(API);
  return data;
};
export const CREATE_NEW_SHIPPING_ADDRESS = async (formData) => {
  const { data } = await axios.post(API, formData);
  return data;
};
export const UPDATE_DEFAULT_SHIPPING_ADDRESS = async (addressId) => {
  const { data } = await axios.patch(API + "/update-default-shipping-address/" + addressId);
  return data;
};
export const DELETE_SHIPPING_ADDRESS = async (addressId) => {
  const { data } = await axios.delete(API + "/update-shipping-address/" + addressId);
  return data;
};
export const UPDATE_SHIPPING_ADDRESS = async ({ addressId, formData }) => {
  const { data } = await axios.patch(API + "/update-shipping-address/" + addressId, formData);
  return data;
};
