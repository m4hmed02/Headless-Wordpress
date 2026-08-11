const wordpressService = require('../services/wordpress.service');

/**
 * Controller to handle GET /api/products
 */
async function getProducts(req, res, next) {
  try {
    const limit = parseInt(req.query.per_page, 10) || 8;
    const formattedProducts = await wordpressService.fetchProducts(limit);
    return res.json(formattedProducts);
  } catch (error) {
    console.error('Error fetching WordPress products:', error.message);
    return res.status(500).json({
      error: 'Failed to fetch products from WordPress',
      message: error.message,
    });
  }
}

module.exports = {
  getProducts,
};
