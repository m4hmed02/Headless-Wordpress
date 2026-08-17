import axios from "axios";

const selectShippingRate = async (packageId, rateId) => {
    const nonce = localStorage.getItem("nonce");
    const cartToken = localStorage.getItem("cartToken");

    const response = await axios.post(
        `${import.meta.env.VITE_SERVER_API_URL}/api/cart/select-shipping-rate`,
        {
            package_id: packageId,
            rate_id: rateId
        },
        {
            headers: {
                "Content-Type": "application/json",
                "Nonce": nonce || "",
                "Cart-Token": cartToken || ""
            }
        }
    );

    const data = response.data.data;

    if (data?.cartToken) {
        localStorage.setItem("cartToken", data.cartToken);
    }

    if (data?.nonce) {
        localStorage.setItem("nonce", data.nonce);
    }

    return data;
};

export default selectShippingRate;
