import axios from "axios";
const URL = import.meta.env.VITE_URL;
const API = `${URL}/api/v1/user`;

export const GET_USER_CART_DETAILS = async () => {
  const { data } = await axios.get(API + "/cart");
  return data;
};
export const CLEAR_USER_CART = async () => {
  const { data } = await axios.get(API + "/cart/clear");
  return data;
};
export const REMOVE_PRODUCT_FROM_USER_CART = async (productId) => {
  const { data } = await axios.delete(API + "/cart/update-cart/" + productId);
  return data;
};
export const ADD_PRODUCT_TO_USER_CART = async ({ productId, qty }) => {
  const { data } = await axios.patch(API + "/cart/" + productId, qty);
  return data;
};
export const GET_USER_WISHLIST_DETAILS = async () => {
  const { data } = await axios.get(API + "/wishlist");
  return data;
};
export const REMOVE_PRODUCT_FROM_USER_WISHLIST = async (productId) => {
  const { data } = await axios.delete(API + "/wishlist/" + productId);
  return data;
};
export const ADD_PRODUCT_TO_USER_WISHLIST = async (productId) => {
  const { data } = await axios.patch(API + "/wishlist/" + productId);
  return data;
};
export const UPDATE_USER_DETAILS = async (formData) => {
  const { data } = await axios.patch(API + "/update-details", formData);
  return data;
};
export const UPDATE_USER_PASSWORD = async (formData) => {
  const { data } = await axios.patch(API + "/update-password", formData);
  return data;
};
export const updateCartItemQty = async ({ cartItemId, changeValue }) => {
  const { data } = await axios.patch(API + "/cart/update-cart/" + cartItemId, { changeValue });
  return data;
};
export const GET_USER_DETAILS = async () => {
  const { data } = await axios.get(API);
  return data;
};
