import axios from "axios";

const addToWishlist = async (customer_id, product_id) => {
    const response = await axios.post(
        `${import.meta.env.VITE_SERVER_API_URL}/api/wishlist/add`,
        { customer_id, product_id }
    );
    return response.data;
};

export default addToWishlist;
