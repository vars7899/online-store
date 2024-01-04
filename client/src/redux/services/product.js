import axios from "axios";
const URL = import.meta.env.VITE_URL;
const API = `${URL}/api/v1/product`;

export const createNewProductCategory = async (formData) => {
  const { data } = await axios.post(API + "/add-new", formData);
  return data;
};

export const updateProductDetails = async ({ productId, formData }) => {
  const { data } = await axios.post(API + "/" + productId, formData);
  return data;
};

export const getAllProducts = async () => {
  const { data } = await axios.get(API);
  return data;
};
export const updateProductFeatureVisibility = async (formData) => {
  const { data } = await axios.patch(API + "/feature/" + formData);
  return data;
};

export const getProductDetails = async (formData) => {
  const { data } = await axios.get(API + `/${formData}`);
  return data;
};

export const createNewProduct = async (formData) => {
  const { data } = await axios.post(API + "/add-new", formData);
  return data;
};

export const createProductReview = async ({ productId, formData }) => {
  const { data } = await axios.post(API + "/review/" + productId, formData);
  return data;
};


