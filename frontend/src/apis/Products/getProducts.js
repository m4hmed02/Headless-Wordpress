import axios from 'axios';

const getProducts = async () => {
    const response = await axios.get(
        `${import.meta.env.VITE_SERVER_API_URL}/api/products`
    );

    return response.data.data;
};

const getProductsById = async (id) => {
    const response = await axios.get(
        `${import.meta.env.VITE_SERVER_API_URL}/api/products/${id}`
    );

    return response.data.data;
};

export { getProducts, getProductsById };