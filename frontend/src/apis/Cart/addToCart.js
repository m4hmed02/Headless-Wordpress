import axios from "axios";
import getCart from "./getCart";

const addToCart = async (id, quantity) => {
    let cartToken = localStorage.getItem("cartToken");
    let nonce = localStorage.getItem("nonce");

    // If nonce or cartToken is missing, fetch cart first to obtain them
    if (!nonce || !cartToken) {
        try {
            await getCart();
            cartToken = localStorage.getItem("cartToken");
            nonce = localStorage.getItem("nonce");
        } catch (err) {
            console.error("Failed to fetch initial cart nonce/token:", err);
        }
    }

    console.log("Cart Token:", cartToken);
    console.log("Nonce:", nonce);

    const makeRequest = async (token, n) => {
        return await axios.post(
            `${import.meta.env.VITE_SERVER_API_URL}/api/cart/add`,
            {
                id,
                quantity
            },
            {
                headers: {
                    "Cart-Token": token || "",
                    "Nonce": n || ""
                }
            }
        );
    };

    let response;
    try {
        response = await makeRequest(cartToken, nonce);
    } catch (error) {
        // If request fails due to invalid/expired nonce or token, refresh nonce and retry once
        if (error.response && (error.response.status === 403 || error.response.status === 400 || error.response.status === 401)) {
            console.warn("Cart request failed, refreshing nonce and retrying...", error.message);
            try {
                await getCart();
                const freshToken = localStorage.getItem("cartToken");
                const freshNonce = localStorage.getItem("nonce");
                response = await makeRequest(freshToken, freshNonce);
            } catch (retryError) {
                throw retryError;
            }
        } else {
            throw error;
        }
    }

    const data = response.data?.data || response.data;

    if (data?.cartToken) {
        localStorage.setItem("cartToken", data.cartToken);
    }

    if (data?.nonce) {
        localStorage.setItem("nonce", data.nonce);
    }

    return data;
};

export default addToCart;