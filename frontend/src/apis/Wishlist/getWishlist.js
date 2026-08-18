import axios from "axios";

const getWishlist = async (customer_id) => {

    const response = await axios.get(
        `${import.meta.env.VITE_SERVER_API_URL}/api/wishlist/${customer_id}`
    );
    return response.data;
}

export default getWishlist;