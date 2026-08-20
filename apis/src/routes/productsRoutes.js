const express = require('express');
const router = express.Router();

const { fetchProducts, fetchProductById, fetchProductsByIds } = require('../controllers/productsController')

router.get('/multiple', fetchProductsByIds);
router.get('/', fetchProducts)
router.get('/:id', fetchProductById)

module.exports = router
