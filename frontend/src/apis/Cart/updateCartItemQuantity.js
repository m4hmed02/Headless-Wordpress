import axios from "axios";

const updateCartItemQuantity = async (key, quantity) => {

    const cartToken = localStorage.getItem("cartToken")
    const nonce = localStorage.getItem("nonce")

    const response = await axios.patch(
        `${import.meta.env.VITE_SERVER_API_URL}/api/cart/update-quantity`,
        {
            key,
            quantity
        },
        {
            headers: {
                'Cart-Token': cartToken || "",
                'Nonce': nonce || ""
            }
        }
    )

    const data = response.data?.data || response.data;


    if (data?.cartToken) {
        localStorage.setItem("cartToken", data.cartToken);
    }

    if (data?.nonce) {
        localStorage.setItem("nonce", data.nonce);
    }

    return data;
}

export default updateCartItemQuantity