import { apiFetch } from './api';

export const processCheckout = async (checkoutData) => {
  return apiFetch('/checkout', {
    method: 'POST',
    body: JSON.stringify(checkoutData),
  });
};
