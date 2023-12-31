import axios from "axios";
const URL = import.meta.env.VITE_URL;
const API = `${URL}/api/v1/user/shipping-address`;

export const getAllShippingAddress = async () => {
  const { data } = await axios.get(API);
  return data;
};
export const createNewShippingAddress = async (formData) => {
  const { data } = await axios.post(API, formData);
  return data;
};
export const updateDefaultShippingAddress = async (addressId) => {
  const { data } = await axios.patch(API + "/update-default-shipping-address/" + addressId);
  return data;
};
export const deleteShippingAddress = async (addressId) => {
  const { data } = await axios.delete(API + "/update-shipping-address/" + addressId);
  return data;
};
export const updateShippingAddressDetails = async ({ addressId, formData }) => {
  const { data } = await axios.patch(API + "/update-shipping-address/" + addressId, formData);
  return data;
};
