const express = require('express');
const productRouter = express.Router();
const auth = require('../middleware/authorization');
const {
    createProduct,
    getProducts,
    getProductById,
    updateProductById,
    deleteProduct
} = require('../controllers/product.controller');

productRouter.post('/', auth, createProduct);
productRouter.get('/', getProducts);
productRouter.get('/:id', auth, getProductById);
productRouter.put('/update', auth, updateProductById);
productRouter.delete('/', auth, deleteProduct);

module.exports = productRouter;
