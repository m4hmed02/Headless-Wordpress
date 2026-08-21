const { woocommerceStoreAPI } = require('./woocommerceService');

const processCheckout = async (
    billingAddress,
    shippingAddress,
    customerNote,
    paymentMethod,
    paymentData,
    nonce,
    cartToken,
    customerId // ADDED
) => {

    console.log('CHECKOUT CART TOKEN:', cartToken);

    const response = await woocommerceStoreAPI.post(
        '/checkout',
        {
            billing_address: billingAddress,
            shipping_address: shippingAddress,
            customer_note: customerNote,
            payment_method: paymentMethod,
            payment_data: paymentData || []
        },
        {
            headers: {
                'Nonce': nonce || '',
                'Cart-Token': cartToken || '',
                'Customer-Id': customerId || '' 
            }
        }
    );

    console.log(
        'WOOCOMMERCE CART TOKEN:',
        response.headers['cart-token']
    );

    return {
        checkout: response.data,
        nonce: response.headers['nonce'],
        cartToken: response.headers['cart-token']
    };
};

module.exports = {
    processCheckout
};