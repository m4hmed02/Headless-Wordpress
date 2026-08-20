const {
  getProducts,
  getProductById,
  getProductsByIds
} = require("../services/WooCommerce/products");

const fetchProducts = async (req, res) => {
  try {
    const products = await getProducts();
    res.status(200).json({
      success: true,
      data: products,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const fetchProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await getProductById(id);
    res.status(200).json({
      success: true,
      data: product,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const fetchProductsByIds = async (req, res) => {
  try {
    const { ids } = req.query;

    if (!ids) {
      return res.status(400).json({
        success: false,
        message: "Product IDs are required",
      });
    }

    const productIds = ids
      .split(",")
      .map((id) => Number(id.trim()))
      .filter((id) => Number.isInteger(id) && id > 0);

    if (productIds.length === 0) {
      return res.status(400).json({
        success: false,
        message: "No valid product IDs provided",
      });
    }

    const products = await getProductsByIds(productIds);

    return res.status(200).json({
      success: true,
      data: products,
    });
  } catch (error) {
    console.error(
      "Get products by IDs error:",
      error.response?.data || error.message,
    );

    return res.status(500).json({
      success: false,
      message: "Failed to fetch products",
      error: error.response?.data || error.message,
    });
  }
};

module.exports = {
  fetchProducts,
  fetchProductById,
  fetchProductsByIds,
};
