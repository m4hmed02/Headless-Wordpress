require('dotenv').config();

const PORT = process.env.PORT || 3000;
const WP_URL = process.env.WP_URL || 'https://localhost/wordpress';
const WC_CONSUMER_KEY = process.env.WC_CONSUMER_KEY || '';
const WC_CONSUMER_SECRET = process.env.WC_CONSUMER_SECRET || '';
const NODE_ENV = process.env.NODE_ENV || 'development';

// Allow self-signed SSL certificates in local development.
// This is the Node.js equivalent of disabling SSL verification in Postman.
// NEVER set this to 0 in production.
if (NODE_ENV !== 'production') {
  process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
}

module.exports = {
  PORT,
  WP_URL,
  WC_CONSUMER_KEY,
  WC_CONSUMER_SECRET,
  NODE_ENV,
};

