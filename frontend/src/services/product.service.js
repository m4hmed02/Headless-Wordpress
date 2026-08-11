import { apiFetch } from './api';

export const getProducts = async () => {
  return apiFetch('/products');
};

export const getProductById = async (id) => {
  return apiFetch(`/products/${id}`);
};
