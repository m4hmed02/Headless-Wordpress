const axios = require('axios');

const wordpressAPI = axios.create({
    baseURL: `${process.env.WORDPRESS_URL}/wp-json/wp/v2`,
});

module.exports = wordpressAPI;