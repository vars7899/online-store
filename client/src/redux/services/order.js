import axios from "axios";
const URL = import.meta.env.VITE_URL;
const API = `${URL}/api/v1/order`;

export const generateOrderCharges = async (formData) => {
  const { data } = await axios.post(API + "/charges", formData);
  return data;
};
export const createNewOrder = async (formData) => {
  const { data } = await axios.post(API, formData);
  return data;
};
export const getStoreChargesPercentage = async () => {
  const { data } = await axios.get(API + "/charges-info");
  return data;
};
export const updateOrderPayment = async ({ orderId, formData }) => {
  const { data } = await axios.post(API + "/update-payment/" + orderId, formData);
  return data;
};

export const getAllUserOrders = async (formData) => {
  let url_string = API + "?";

  if (formData) {
    const { orderState, paymentMethod, shippingMethod, shippingServiceType } = formData;

    // >> Add query parameters
    if (orderState !== "all") url_string += `withOrderState=${orderState}&`;
    if (paymentMethod !== "all") url_string += `withPaymentMethod=${paymentMethod}&`;
    if (shippingMethod !== "all") url_string += `withShippingMethod=${shippingMethod}&`;
    if (shippingServiceType !== "all") url_string += `withShippingServiceType=${shippingServiceType}&`;
  }

  const { data } = await axios.get(url_string);
  return data;
};