import axios from 'axios';

const removeItemFromCart = async (key) => {

    const cartToken = localStorage.getItem("cartToken");
    const nonce = localStorage.getItem("nonce")

    const response = await axios.post(
        `${import.meta.env.VITE_SERVER_API_URL}/api/cart/remove`,
        {
            key
        },
        {
            headers: {
                "Cart-Token": cartToken,
                "Nonce": nonce
            }
        }
    )

    const data = response.data

    if (data?.nonce) {
        localStorage.setItem("nonce", data.nonce)
    }

    if (data?.cartToken) {
        localStorage.setItem("cartToken", data.cartToken);
    }

    return data
}

export default removeItemFromCart