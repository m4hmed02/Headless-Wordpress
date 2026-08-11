import { apiFetch } from './api';

export const getCart = async () => {
  return apiFetch('/cart');
};

export const addToCart = async (productId, quantity = 1) => {
  return apiFetch('/cart', {
    method: 'POST',
    body: JSON.stringify({ productId, quantity }),
  });
};
