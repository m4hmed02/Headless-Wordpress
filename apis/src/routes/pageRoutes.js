const express = require('express');
const router = express.Router()

const { fetchPages } = require('../controllers/pageController')

router.get('/', fetchPages)

module.exports = router