import axios from "axios";
const URL = import.meta.env.VITE_URL;
const API = `${URL}/api/v1/category`;

export const createNewProductCategory = async (formData) => {
  const { data } = await axios.post(API + "/add-new", formData);
  return data;
};

export const getAllProductCategories = async () => {
  const { data } = await axios.get(API);
  return data;
};

export const getAllProductAssociatedWithCategory = async (formData) => {
  const { data } = await axios.get(API + `/${formData}`);
  return data;
};
