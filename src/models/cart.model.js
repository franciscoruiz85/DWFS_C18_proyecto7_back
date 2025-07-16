const mongoose = require("mongoose");
const cartSchema = mongoose.Schema({
    products: [
        {
            priceID: {
                type: String,
                required: true
            },
            productname: {
                type: String,
                required: true
            },
            price: {
                type: Number,
                required: true
            },
            quantity: {
                type: Number,
                required: true
            },
            image: {
                type: String,
                required: true
            },
            slug: {
                type: String,
                required: true
            }
        }
    ]
})

const Cart = mongoose.model('Cart', cartSchema);

module.exports = Cart;
