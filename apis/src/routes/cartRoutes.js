const express = require('express');
const router = express.Router()
const { 
        fetchCart, 
        addProductToCart, 
        removeProductFromCart, 
        changeCartItemQuantity 
    } = require('../controllers/cartController')

router.get('/', fetchCart)
router.post('/add', addProductToCart)
router.post('/remove', removeProductFromCart)
router.patch('/update-quantity', changeCartItemQuantity)

module.exports = router