const { woocommerceAPI } = require('./woocommerceService')

const getProducts = async () => {
    const response = await woocommerceAPI.get('/products')
    return response.data
}

const getProductById = async (id) => {
    const response = await woocommerceAPI.get(`/products/${id}`)
    return response.data
}

module.exports = {
    getProducts,
    getProductById
}