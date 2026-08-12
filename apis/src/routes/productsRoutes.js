const express = require('express');
const router = express.Router();

const { fetchProducts, fetchProductById } = require('../controllers/productsController')

router.get('/', fetchProducts)
router.get('/:id', fetchProductById)

module.exports = router