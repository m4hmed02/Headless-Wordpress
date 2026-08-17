const { woocommerceAPI } = require('./woocommerceService')

const getCustomer = async(customerId) => {
    const response = await woocommerceAPI.get(
        `/customers/${customerId}`
    )
    return response.data;
}

const createCustomer = async(customerData) => {
    const response = await woocommerceAPI.post(
        '/customers',
        customerData
    )
    return response.data;
}

const updateCustomer = async(customerId, data) => {
    const response = await woocommerceAPI.put(
        `/customers/${customerId}`,
        data
    )
    return response.data;
}

module.exports = {
    getCustomer,
    updateCustomer,
    createCustomer
}