import axios from "axios";
const URL = import.meta.env.VITE_URL;
const API = `${URL}/api/v1/user`;

export const getUserCartDetails = async () => {
  const { data } = await axios.get(API + "/cart");
  return data;
};
export const clearUserCart = async () => {
  const { data } = await axios.get(API + "/cart/clear");
  return data;
};
export const removeProductFromUserCart = async (productId) => {
  const { data } = await axios.delete(API + "/cart/update-cart/" + productId);
  return data;
};
export const addProductToUserCart = async ({ productId, qty }) => {
  const { data } = await axios.patch(API + "/cart/" + productId, qty);
  return data;
};
export const getUserWishlistDetails = async () => {
  const { data } = await axios.get(API + "/wishlist");
  return data;
};
export const removeProductFromUserWishlist = async (productId) => {
  const { data } = await axios.delete(API + "/wishlist/" + productId);
  return data;
};
export const addProductToUserWishlist = async (productId) => {
  const { data } = await axios.patch(API + "/wishlist/" + productId);
  return data;
};
export const updateUserDetails = async (formData) => {
  const { data } = await axios.patch(API + "/update-details", formData);
  return data;
};
export const updateUserPassword = async (formData) => {
  const { data } = await axios.patch(API + "/update-password", formData);
  return data;
};
export const updateCartItemQty = async ({ cartItemId, changeValue }) => {
  const { data } = await axios.patch(API + "/cart/update-cart/" + cartItemId, { changeValue });
  return data;
};
export const getUserDetails = async () => {
  const { data } = await axios.get(API);
  return data;
};
