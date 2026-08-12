const axios = require('axios');
const https = require('https');

const woocommerceAPI = axios.create({
    baseURL: `${process.env.WOOCOMMERCE_URL}/wp-json/wc/v3`,
    auth: {
        username: process.env.WC_CONSUMER_KEY,
        password: process.env.WC_CONSUMER_SECRET
    },
    httpsAgent: new https.Agent({
        rejectUnauthorized: false
    })
})

const woocommerceStoreAPI = axios.create({
    baseURL: `${process.env.WOOCOMMERCE_URL}/wp-json/wc/store/v1`,
    
    httpsAgent: new https.Agent({
        rejectUnauthorized: false
    })
})

module.exports = {
    woocommerceAPI,
    woocommerceStoreAPI
};