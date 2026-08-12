const wordpressAPI = require('./wordpressService')

const getPages = async () => {
    const response = await wordpressAPI.get('/pages');
    return response.data
}

module.exports = {
    getPages
}