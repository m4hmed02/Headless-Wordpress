const axios = require('axios');

const authenticateCustomer = async (username, password) => {
    const response = await axios.post(
        `${process.env.WORDPRESS_URL}/wp-json/headless/v1/login`,
        {
            username,
            password
        },
        {
            httpsAgent: new (require('https').Agent)({
                rejectUnauthorized: false
            })
        }
    );

    return response.data;
}

module.exports = {
    authenticateCustomer
};