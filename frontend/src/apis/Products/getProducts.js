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

const getMultipleProducts = async (productIds) => {
    const response = await axios.get(
        `${import.meta.env.VITE_SERVER_API_URL}/api/products/multiple?ids=${productIds.join(",")}`
    );
    return response.data;
}

export { getProducts, getProductsById, getMultipleProducts };