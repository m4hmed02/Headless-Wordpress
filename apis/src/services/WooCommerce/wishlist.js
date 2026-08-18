const { woocommerceHeadlessAPI } = require("./woocommerceService"); // Adjust path to your service file

const addToWishlist = async (customerId, productId) => {
  const response = await woocommerceHeadlessAPI.post("/wishlist", {
    customer_id: customerId,
    product_id: productId,
  });

  return response.data;
};

const getWishlist = async (customerId) => {
  const response = await woocommerceHeadlessAPI.get("/wishlist", {
    params: { customer_id: customerId },
  });
  return response.data;
};

const removeFromWishlist = async (customerId, productId) => {
  const response = await woocommerceHeadlessAPI.delete("/wishlist", {
    data: {
      customer_id: customerId,
      product_id: productId,
    },
  });
  return response.data;
};

module.exports = {
  addToWishlist,
  getWishlist,
  removeFromWishlist,
};
