const express = require('express');
const router = express.Router()
const { fetchCart, addProductToCart } = require('../controllers/cartController')

router.get('/', fetchCart)
router.post('/add', addProductToCart)

module.exports = router