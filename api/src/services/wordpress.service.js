const { WP_URL, WC_CONSUMER_KEY, WC_CONSUMER_SECRET } = require('../config/config');

/**
 * Build a WooCommerce REST API URL using pretty permalinks format.
 * This matches what Postman uses: /wp-json/wc/v3/...
 * @param {string} path - WooCommerce path (e.g. '/wc/v3/products')
 * @param {Object} params - Extra query parameters
 * @returns {string} Full authenticated URL
 */
function buildWcUrl(path, params = {}) {
  const base = WP_URL.endsWith('/') ? WP_URL.slice(0, -1) : WP_URL;
  const url = new URL(`${base}/wp-json${path}`);

  url.searchParams.set('consumer_key', WC_CONSUMER_KEY);
  url.searchParams.set('consumer_secret', WC_CONSUMER_SECRET);

  for (const [key, value] of Object.entries(params)) {
    url.searchParams.set(key, value);
  }

  return url.toString();
}

/**
 * Fetch real products from WooCommerce REST API
 * @param {number} limit - Max number of products to return
 * @returns {Promise<Array>} Array of formatted product objects
 */
async function fetchProducts(limit = 8) {
  const endpoint = buildWcUrl('/wc/v3/products', {
    per_page: limit,
    status: 'publish',
  });

  console.log('[WooCommerce] Fetching:', endpoint.replace(WC_CONSUMER_SECRET, '***'));

  const response = await fetch(endpoint);

  if (!response.ok) {
    const errorBody = await response.text();
    throw new Error(`WooCommerce API returned status ${response.status}: ${errorBody}`);
  }

  const products = await response.json();

  return products.map((product) => ({
    id: product.id,
    name: product.name,
    price: product.price || product.sale_price || product.regular_price,
    regular_price: product.regular_price || null,
    sale_price: product.sale_price || null,
    images: product.images?.length
      ? product.images.map((img) => ({ src: img.src, alt: img.alt }))
      : [{ src: '', alt: product.name }],
    category: product.categories?.[0]?.name || 'General',
    description:
      product.short_description?.replace(/<[^>]+>/g, '') ||
      product.description?.replace(/<[^>]+>/g, '') ||
      '',
    slug: product.slug,
    stock_status: product.stock_status,
    rating: product.average_rating,
    review_count: product.rating_count,
  }));
}

module.exports = {
  fetchProducts,
};
