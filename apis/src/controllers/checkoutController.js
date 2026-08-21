const { processCheckout } = require('../services/WooCommerce/checkout.js');

const placeOrder = async (req, res) => {
    try {
        const {
            billing_address,
            shipping_address,
            customer_note,
            payment_method,
            payment_data,
            cart_token,
            customer_id
        } = req.body;


        const nonce = req.headers['nonce'];
        const headerCartToken = req.headers['cart-token'];
        const finalCartToken = headerCartToken || cart_token || '';

        const checkout = await processCheckout(
            billing_address,
            shipping_address,
            customer_note,
            payment_method,
            payment_data,
            nonce,
            finalCartToken,
            customer_id 
        );

        res.status(200).json({
            success: true,
            data: checkout
        });

    } catch (error) {

        console.log('CHECKOUT ERROR:', error.message);

        if (error.response) {
            console.log('STATUS:', error.response.status);
            console.log('DATA:', error.response.data);
            console.log('HEADERS:', error.response.headers);
        }

        res.status(error.response?.status || 500).json({
            success: false,
            message: error.message,
            wooCommerce: error.response?.data || null
        });
    }
};

module.exports = {
    placeOrder
};