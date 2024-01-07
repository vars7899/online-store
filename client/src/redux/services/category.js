import axios from "axios";
const URL = import.meta.env.VITE_URL;
const API = `${URL}/api/v1/category`;

export const CREATE_NEW_PRODUCT_CATEGORY = async (formData) => {
  const { data } = await axios.post(API + "/add-new", formData);
  return data;
};

export const GET_ALL_PRODUCT_CATEGORIES = async () => {
  const { data } = await axios.get(API);
  return data;
};

export const GET_ALL_PRODUCT_ASSOCIATED_WITH_CATEGORY = async (formData) => {
  const { data } = await axios.get(API + `/${formData}`);
  return data;
};
