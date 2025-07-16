const express = require('express');
const cartRouter = express.Router();
const auth = require('../middleware/authorization');
const {
    getCheckout,
    getCart,
    editCart,
    clearCart
} = require('../controllers/cart.controller')

cartRouter.get('/get-cart', auth, getCart);
cartRouter.put('/edit-cart', auth, editCart);
cartRouter.get('/checkout', auth, getCheckout);
cartRouter.get('/clear-cart', auth, clearCart);

module.exports = cartRouter;
