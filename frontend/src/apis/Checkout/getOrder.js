import axios from 'axios';

const getGuestOrders = async () => {
    let cartToken = localStorage.getItem("cartToken");
    const response = await axios.get(
        `${import.meta.env.VITE_SERVER_API_URL}/api/orders/guest?cartToken=${cartToken}`
    );

    return response.data;
};

// 2. Logged-in User ki orders fetch karne ke liye (via customerId)
const getCustomerOrders = async (customerId) => {
    const response = await axios.get(
        `${import.meta.env.VITE_SERVER_API_URL}/api/orders/user?customerId=${customerId}`
    );

    return response.data;
};

export { getGuestOrders, getCustomerOrders };