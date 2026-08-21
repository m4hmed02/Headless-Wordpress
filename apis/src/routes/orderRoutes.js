const express = require('express');
const router = express.Router();
const { 
    fetchGuestOrders, 
    fetchCustomerOrders 
} = require('../controllers/orderController');


router.get('/guest', fetchGuestOrders);
router.get('/user', fetchCustomerOrders);

module.exports = router;