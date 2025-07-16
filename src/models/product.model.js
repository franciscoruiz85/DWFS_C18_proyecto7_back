const mongoose = require("mongoose");
const productSchema = mongoose.Schema(
    {
        idProd: {
            type: String,
            required: true
        },
        priceID: {
            type: String,
            required: true
        },
        currency: {
            type: String,
            required: true
        },
        slug: {
            type: String,
            required: true,
            unique: true
        },
        productname: {
            type: String,
            required: true
        },
        type: {
            type: String,
            required: true
        },
        cc: {
            type: Number,
            required: false
        },
        price: {
            type: Number,
            required: true
        },
        description: {
            type: String,
            required: true
        },
        image: {
            type: String,
            required: false,
            default: null
        },

    },
    {
        timestamps: true
    }
);

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
