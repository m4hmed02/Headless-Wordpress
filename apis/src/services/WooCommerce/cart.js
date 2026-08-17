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

const removeItemFromCart = async (key, nonce, cartToken) => {
    const response = await woocommerceStoreAPI.post(
        '/cart/remove-item',
        null,
        {
            params: {
                key
            },
            headers: {
                'Nonce': nonce,
                'Cart-Token': cartToken
            }
        }
    );
    return {
        cart: response.data,
        nonce: response.headers['nonce'],
        cartToken: response.headers['cart-token']
    }
}

const updateCartItemQuantity = async (key, quantity, nonce, cartToken) => {
    const response = await woocommerceStoreAPI.post(
        '/cart/update-item',
        null,{
            params: {
                key, 
                quantity
            },
            headers: {
                'Nonce': nonce,
                'Cart-Token': cartToken
            }
        }
    )
    return {
        cart: response.data,
        nonce: response.headers['nonce'],
        cartToken: response.headers['cart-token']
    }
}


const selectShippingRate = async (packageId, rateId, nonce, cartToken) => {
    const response = await woocommerceStoreAPI.post(
        '/cart/select-shipping-rate',
        {
            package_id: packageId,
            rate_id: rateId
        },
        {
            headers: {
                'Nonce': nonce,
                'Cart-Token': cartToken
            }
        }
    );
    return {
        cart: response.data,
        nonce: response.headers['nonce'],
        cartToken: response.headers['cart-token']
    };
};

module.exports = {
    getCart,
    addToCart,
    removeItemFromCart,
    updateCartItemQuantity,
    selectShippingRate
};