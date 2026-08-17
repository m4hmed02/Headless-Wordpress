const express = require('express');
const router = express.Router();
const { fetchCustomer, registerCustomer } = require('../controllers/customerController');

router.get('/:customerId', fetchCustomer);
router.post('/register', registerCustomer);

module.exports = router;