const express = require('express')
const app = express()
const cors = require('cors')
const pageRoutes = require('./routes/pageRoutes')
const productsRoutes = require('./routes/productsRoutes')
const cartRoutes = require('./routes/cartRoutes')

app.use(cors())
app.use(express.json())

app.get('/', (req, res) => {
    res.send('Backend Working!');
});


app.use('/api/pages', pageRoutes)
app.use('/api/products', productsRoutes)
app.use('/api/cart', cartRoutes)

module.exports = app