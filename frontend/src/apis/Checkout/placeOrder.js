import axios from "axios";

const placeOrder = async ({
    billingAddress,
    shippingAddress,
    customerNote,
    paymentMethod,
    paymentData = []
}) => {
    const nonce = localStorage.getItem("nonce");
    const cartToken = localStorage.getItem("cartToken");

    const response = await axios.post(
        `${import.meta.env.VITE_SERVER_API_URL}/api/checkout`,
        {
            billing_address: billingAddress,
            shipping_address: shippingAddress,
            customer_note: customerNote,
            payment_method: paymentMethod,
            payment_data: paymentData
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

export default placeOrder;