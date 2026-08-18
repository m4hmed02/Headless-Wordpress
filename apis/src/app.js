const express = require('express')
const session = require('express-session');
const app = express()
const cors = require('cors')
const pageRoutes = require('./routes/pageRoutes')
const productsRoutes = require('./routes/productsRoutes')
const cartRoutes = require('./routes/cartRoutes')
const checkoutRoutes = require('./routes/checkoutRoutes')
const authRoutes = require('./routes/authRoutes')
const customerRoutes = require('./routes/customerRoutes')
const wishlistRoutes = require('./routes/wishlistRoutes')

app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}));
app.use(express.json())

app.use(
    session({
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: false,
        cookie: {
            httpOnly: true,
            secure: false,
            sameSite: 'lax'
        }
    })
);

app.get('/', (req, res) => {
    res.send('Backend Working!');
});

app.use('/api/pages', pageRoutes)
app.use('/api/products', productsRoutes)
app.use('/api/cart', cartRoutes)
app.use('/api/checkout', checkoutRoutes)
app.use('/api/auth', authRoutes)
app.use('/api/customers', customerRoutes)
app.use('/api/wishlist', wishlistRoutes)

module.exports = app