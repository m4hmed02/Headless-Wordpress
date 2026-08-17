const { 
    getCart, 
    addToCart, 
    removeItemFromCart,
    updateCartItemQuantity,
    selectShippingRate
 } = require('../services/WooCommerce/cart')


const fetchCart = async (req, res) => {
    try {
        const cartToken = req.headers['cart-token'];

        const cart = await getCart(cartToken);

        res.status(200).json({
            success: true,
            data: cart
        });

    } catch (error) {
        console.log('CART ERROR:', error.message);

        if (error.response) {
            console.log('STATUS:', error.response.status);
            console.log('DATA:', error.response.data);
            console.log('HEADERS:', error.response.headers);
        }

        res.status(error.response?.status || 500).json({
            success: false,
            message: error.message,
            wooCommerce: error.response?.data
        });
    }
};

const addProductToCart = async(req, res) => {
    try{
        const { id, quantity } = req.body;

        const nonce = req.headers['nonce'];
        const cartToken = req.headers['cart-token'];

        const cart = await addToCart(id, quantity, nonce, cartToken);
        res.status(200).json({
            success: true,
            data: cart
        })
    }catch (error) {
        console.log('CART ERROR:', error.message);

        if (error.response) {
            console.log('STATUS:', error.response.status);
            console.log('DATA:', error.response.data);
        }

        res.status(error.response?.status || 500).json({
            success: false,
            message: error.message,
            wooCommerce: error.response?.data
        });
    }
}

const removeProductFromCart = async(req, res) => {
    try{
        const { key } = req.body;
        const nonce = req.headers['nonce']
        const cartToken = req.headers['cart-token']

        const cart = await removeItemFromCart(key, nonce, cartToken);
        res.status(200).json({
            success: true,
            data: cart
        })

    } catch (error) {
        console.log('CART ERROR:', error.message);

        if (error.response) {
            console.log('STATUS:', error.response.status);
            console.log('DATA:', error.response.data);
        }

        res.status(error.response?.status || 500).json({
            success: false,
            message: error.message,
            wooCommerce: error.response?.data
        });
    }
}

const changeCartItemQuantity = async(req, res) => {

    const { key, quantity } = req.body;
    const nonce = req.headers['nonce'];
    const cartToken = req.headers['cart-token'];

    try {
        const cart = await updateCartItemQuantity(
            key,
            quantity,
            nonce,
            cartToken
        );

        res.status(200).json({
            success: true,
            data: cart
        });

    } catch (error) {
        console.log('CART ERROR:', error.message);

        if (error.response) {
            console.log('STATUS:', error.response.status);
            console.log('DATA:', error.response.data);
        }

        res.status(error.response?.status || 500).json({
            success: false,
            message: error.message,
            wooCommerce: error.response?.data
        });
    }
};


const chooseShippingRate = async(req, res) => {
    const { package_id, rate_id } = req.body;
    const nonce = req.headers['nonce'];
    const cartToken = req.headers['cart-token'];

    try {
        const cart = await selectShippingRate(
            package_id || 0,
            rate_id,
            nonce,
            cartToken
        );

        res.status(200).json({
            success: true,
            data: cart
        });

    } catch (error) {
        console.log('CART ERROR:', error.message);

        if (error.response) {
            console.log('STATUS:', error.response.status);
            console.log('DATA:', error.response.data);
        }

        res.status(error.response?.status || 500).json({
            success: false,
            message: error.message,
            wooCommerce: error.response?.data
        });
    }
};

module.exports = {
    fetchCart,
    addProductToCart,
    removeProductFromCart,
    changeCartItemQuantity,
    chooseShippingRate
}
