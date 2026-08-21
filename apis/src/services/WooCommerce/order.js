const axios = require('axios');

// 1. Guest User Orders Fetching (by Cart Token)
const getGuestOrders = async (cartToken) => {
    console.log('FETCHING GUEST ORDERS FOR CART TOKEN:', cartToken);

    const response = await axios.get(
        `${process.env.WORDPRESS_URL}/wp-json/headless/v1/orders-by-cart-token`,
        {
            params: {
                cart_token: cartToken
            }
        }
    );

    return response.data;
};

// 2. Logged-in User Orders Fetching (by Customer ID)
const getCustomerOrders = async (customerId) => {
    console.log('FETCHING CUSTOMER ORDERS FOR ID:', customerId);

    const response = await axios.get(
        `${process.env.WORDPRESS_URL}/wp-json/headless/v1/orders-by-cart-token`,
        {
            params: {
                customer_id: customerId
            }
        }
    );

    return response.data;
};

module.exports = {
    getGuestOrders,
    getCustomerOrders
};