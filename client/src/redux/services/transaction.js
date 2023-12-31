import axios from "axios";
const URL = import.meta.env.VITE_URL;
const API = `${URL}/api/v1/transaction`;

export const createNewTransactionRecord = async (formData) => {
  const { data } = await axios.post(API + "/new-transaction", formData);
  return data;
};

export const getAllUserTransactions = async () => {
  const { data } = await axios.get(API);
  return data;
};
