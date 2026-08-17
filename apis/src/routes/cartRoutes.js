const express = require('express');
const router = express.Router()
const { 
        fetchCart, 
        addProductToCart, 
        removeProductFromCart, 
        changeCartItemQuantity,
    chooseShippingRate 
    } = require('../controllers/cartController')

router.get('/', fetchCart)
router.post('/add', addProductToCart)
router.post('/remove', removeProductFromCart)
router.patch('/update-quantity', changeCartItemQuantity)

router.post('/select-shipping-rate', chooseShippingRate)

module.exports = router