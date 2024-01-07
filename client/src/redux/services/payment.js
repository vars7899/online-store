import axios from "axios";
const URL = import.meta.env.VITE_URL;
const API = `${URL}/api/v1/payment`;

export const GET_STRIPE_PUBLIC_KEY = async () => {
  const { data } = await axios.get(API + "/publicKey");
  return data;
};

export const CREATE_NEW_PAYMENT_INTENT = async (formData) => {
  const { data } = await axios.post(API + "/create-payment-intent", formData);
  return data;
};

export const CREATE_NEW_PAYMENT_INTENT_FOR_WALLET = async (formData) => {
  const { data } = await axios.post(API + "/create-wallet-payment-intent", formData);
  return data;
};

