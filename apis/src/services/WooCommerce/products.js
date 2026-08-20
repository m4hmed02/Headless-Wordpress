const { woocommerceAPI } = require("./woocommerceService");
const axios = require("axios");
const https = require("https");

const getProducts = async () => {
  const response = await woocommerceAPI.get("/products");
  return response.data;
};

const getProductById = async (id) => {
  const response = await woocommerceAPI.get(`/products/${id}`);
  return response.data;
};

const getProductsByIds = async (productIds) => {
  const response = await axios.get(
    `${process.env.WOOCOMMERCE_URL}/wp-json/wc/v3/products`,
    {
      params: {
        include: productIds.join(","),
        per_page: 100,
      },
      auth: {
        username: process.env.WC_CONSUMER_KEY,
        password: process.env.WC_CONSUMER_SECRET,
      },
      httpsAgent: new https.Agent({
        rejectUnauthorized: false,
      }),
    },
  );

  return response.data;
};

module.exports = {
  getProducts,
  getProductById,
  getProductsByIds,
};
