import axios from "axios";
const URL = import.meta.env.VITE_URL;
const API = `${URL}/api/v1/product`;

export const createNewProductCategory = async (formData) => {
  const { data } = await axios.post(API + "/add-new", formData);
  return data;
};

export const UPDATE_PRODUCT_DETAILS = async ({ productId, formData }) => {
  const { data } = await axios.patch(API + "/" + productId, formData);
  return data;
};

export const GET_ALL_PRODUCTS = async () => {
  const { data } = await axios.get(API);
  return data;
};
export const UPDATE_PRODUCT_FEATURE_VISIBILITY = async (formData) => {
  const { data } = await axios.patch(API + "/feature/" + formData);
  return data;
};

export const GET_PRODUCT_DETAILS = async (formData) => {
  const { data } = await axios.get(API + `/${formData}`);
  return data;
};

export const CREATE_NEW_PRODUCT = async (formData) => {
  const { data } = await axios.post(API + "/add-new", formData);
  return data;
};

export const CREATE_PRODUCT_REVIEW = async ({ productId, formData }) => {
  const { data } = await axios.post(API + "/review/" + productId, formData);
  return data;
};


