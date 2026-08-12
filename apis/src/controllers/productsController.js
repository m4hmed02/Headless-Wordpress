const { getProducts, getProductById } = require('../services/WooCommerce/products')

const fetchProducts = async (req, res) => {
    try {
        const products = await getProducts();
        res.status(200).json({
            success: true,
            data: products
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

const fetchProductById = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await getProductById(id);
        res.status(200).json({
            success: true,
            data: product
        })
    }catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

module.exports = {
    fetchProducts,
    fetchProductById
}