import axios from "axios";

const removeFromWishlist = async (customer_id, product_id) => {


    const response = await axios.delete(
        `${import.meta.env.VITE_SERVER_API_URL}/api/wishlist/remove`,
        {
            data: { customer_id, product_id }
        }
    );
    return response.data;
};

export default removeFromWishlist;