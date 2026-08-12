const { woocommerceStoreAPI } = require('./woocommerceService');

const getCart = async (cartToken) => {
    const response = await woocommerceStoreAPI.get('/cart', {
        headers: {
            'Cart-Token': cartToken || ''
        }
    });

    return {
        cart: response.data,
        nonce: response.headers['nonce'],
        cartToken: response.headers['cart-token']
    };
};

const addToCart = async (id, quantity, nonce, cartToken) => {
    const response = await woocommerceStoreAPI.post(
        '/cart/add-item',
        null,
        {
            params: {
                id,
                quantity
            },
            headers: {
                'Nonce': nonce,
                'Cart-Token': cartToken
            }
        }
    );

    return response.data;
};

module.exports = {
    getCart,
    addToCart
};