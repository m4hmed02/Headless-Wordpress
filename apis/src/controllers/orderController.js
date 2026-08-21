const { getGuestOrders, getCustomerOrders } = require('../services/WooCommerce/order');

// 1. Guest User Orders Controller
const fetchGuestOrders = async (req, res) => {
    try {
        const { cartToken } = req.query;

        if (!cartToken) {
            return res.status(400).json({
                success: false,
                message: 'Cart token is required'
            });
        }

        const data = await getGuestOrders(cartToken);
        return res.status(200).json(data);
    } catch (error) {
        console.error('Error fetching guest orders:', error.message);
        return res.status(error.response?.status || 500).json({
            success: false,
            message: error.response?.data?.message || 'Failed to fetch guest orders'
        });
    }
};

// 2. Logged-in User Orders Controller
const fetchCustomerOrders = async (req, res) => {
    try {
        const { customerId } = req.query;

        if (!customerId) {
            return res.status(400).json({
                success: false,
                message: 'Customer ID is required'
            });
        }

        const data = await getCustomerOrders(customerId);
        return res.status(200).json(data);
    } catch (error) {
        console.error('Error fetching customer orders:', error.message);
        return res.status(error.response?.status || 500).json({
            success: false,
            message: error.response?.data?.message || 'Failed to fetch customer orders'
        });
    }
};

module.exports = {
    fetchGuestOrders,
    fetchCustomerOrders
};