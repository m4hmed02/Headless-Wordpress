const express = require('express');
const router = express.Router();
const productsRoutes = require('./products.routes');

// Health Check / API info
router.get('/', (req, res) => {
  res.json({ message: 'WordPress Headless API Server' });
});

// API Routes
router.use('/api/products', productsRoutes);

module.exports = router;
