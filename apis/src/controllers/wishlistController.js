const {
  addToWishlist,
  getWishlist,
  removeFromWishlist
} = require("../services/WooCommerce/wishlist");

const addProductToWishlist = async (req, res) => {
  try {
    const { customer_id, product_id } = req.body;

    if (!customer_id || !product_id) {
      return res.status(400).json({
        success: false,
        message: "Both customer_id and product_id are required.",
      });
    }

    const result = await addToWishlist(customer_id, product_id);
    return res.status(201).json(result);
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "An error occurred while adding the product to the wishlist.",
    });
  }
};

const getCustomerWishlist = async (req, res) => {
  try {
    const { customer_id } = req.params;

    if (!customer_id) {
      return res.status(400).json({
        success: false,
        message: "customer_id is required.",
      });
    }

    const wishlist = await getWishlist(customer_id);
    return res.status(200).json({
      success: true,
      data: wishlist,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "An error occurred while fetching the wishlist.",
    });
  }
};

const removeProductFromWishlist = async (req, res) => {
  try {
    const { customer_id, product_id } = req.body;

    if (!customer_id || !product_id) {
      return res.status(400).json({
        success: false,
        message: "Both customer_id and product_id are required.",
      });
    }

    const result = await removeFromWishlist(customer_id, product_id);

    return res.status(200).json(result);
  } catch (error) {
    if (error.response) {
      return res.status(error.response.status).json(error.response.data);
    }

    return res.status(500).json({
      success: false,
      message:
        "An error occurred while removing the product from the wishlist.",
    });
  }
};

module.exports = {
  addProductToWishlist,
  getCustomerWishlist,
  removeProductFromWishlist,
};
