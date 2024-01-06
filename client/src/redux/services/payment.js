import axios from "axios";
const URL = import.meta.env.VITE_URL;
const API = `${URL}/api/v1/payment`;

export const getStripePublicKeyFromServer = async () => {
  const { data } = await axios.get(API + "/publicKey");
  return data;
};

export const createPaymentIntent = async (formData) => {
  const { data } = await axios.post(API + "/create-payment-intent", formData);
  return data;
};

export const createNewPaymentIntentForWallet = async (formData) => {
  const { data } = await axios.post(API + "/create-wallet-payment-intent", formData);
  return data;
};

export const payOrderWithWallet = async (formData) => {
  const { data } = await axios.post(API + "/pay-with-wallet", formData);
  return data;
};
