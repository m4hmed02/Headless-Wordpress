const express = require('express');

const router = express.Router();

const {
    loginCustomer,
    logoutCustomer
} = require('../controllers/authController');

router.post('/login', loginCustomer);

router.post('/logout', logoutCustomer);

module.exports = router;