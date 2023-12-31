import axios from "axios";
const URL = import.meta.env.VITE_URL;
const API = `${URL}/api/v1/order`;

export const GET_STORE_CHARGES_PERCENTAGE = async () => {
  const { data } = await axios.get(API + "/charges-info");
  return data;
};

export const GET_ALL_ORDERS_ASSOCIATED_WITH_PRODUCT = async (formData) => {
  const { data } = await axios.get(API + "/with-product/" + formData);
  return data;
};

export const CREATE_NEW_ORDER = async (formData) => {
  const { data } = await axios.post(API, formData);
  return data;
};

export const GET_ORDER_CHARGES = async (formData) => {
  const { data } = await axios.post(API + "/charges", formData);
  return data;
};

export const GET_ALL_USER_ORDERS = async (formData) => {
  let url_string = API + "?";

  if (formData) {
    const { orderState, paymentMethod, shippingMethod, shippingServiceType, orderDuration } = formData;

    // >> Add query parameters
    if (orderState !== "all") url_string += `withOrderState=${orderState}&`;
    if (paymentMethod !== "all") url_string += `withPaymentMethod=${paymentMethod}&`;
    if (shippingMethod !== "all") url_string += `withShippingMethod=${shippingMethod}&`;
    if (shippingServiceType !== "all") url_string += `withShippingServiceType=${shippingServiceType}&`;
    if (orderDuration !== "all") url_string += `withOrderDuration=${orderDuration}&`;
  }

  const { data } = await axios.get(url_string);
  return data;
};
