import axios from "axios";

const getCart = async () => {
    const cartToken = localStorage.getItem("cartToken");

    const response = await axios.get(
        `${import.meta.env.VITE_SERVER_API_URL}/api/cart`,
        {
            headers: {
                "Cart-Token": cartToken || ""
            }
        }
    );

    const data = response.data.data;

    // Save the Cart-Token
    if (data?.cartToken) {
        localStorage.setItem("cartToken", data.cartToken);
    }

    // Save the Nonce
    if (data?.nonce) {
        localStorage.setItem("nonce", data.nonce);
    }

    return data;
};

export default getCart;