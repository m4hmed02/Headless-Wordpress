const { getCustomer, createCustomer } = require('../services/WooCommerce/customer')

const fetchCustomer = async (req, res) => {
    try {
        const { customerId } = req.params
        
        const customer = await getCustomer(customerId)
        res.status(200).json({
            success: true,
            customer
        })
    } catch (error) {
        console.error('Error fetching customer:', error)
        res.status(500).json({
            success: false,
            message: 'Error fetching customer'
        })
    }
}

const registerCustomer = async (req, res) => {
     try {
        const {
            email,
            username,
            password,
            first_name,
            last_name,
            billing,
            shipping
        } = req.body;

        const customer = await createCustomer({
            email,
            username,
            password,
            first_name,
            last_name,
            billing,
            shipping,
            role: 'customer'
        });

        res.status(201).json({
            success: true,
            data: customer
        });

    } catch (error) {
        console.log('CUSTOMER REGISTER ERROR:', error.message);

        if (error.response) {
            console.log('STATUS:', error.response.status);
            console.log('DATA:', error.response.data);
        }

        res.status(error.response?.status || 500).json({
            success: false,
            message: error.message,
            wooCommerce: error.response?.data
        });
    }
}

module.exports = {
    fetchCustomer,
    registerCustomer
}