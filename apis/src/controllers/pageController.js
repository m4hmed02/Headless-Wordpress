const { getPages } = require('../services/WordPress/pages');

const fetchPages = async (req, res) => {
    try {
        const pages = await getPages();
        res.status(200).json({
            success: true,
            data: pages
        });

    } catch (error) {
        console.log('WORDPRESS ERROR:', error.message);

        res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

module.exports = {
    fetchPages
}