const express = require('express');
const productRouter = express.Router();
const auth = require('../middleware/authorization');
const {
    createProduct,
    getProducts,
    updateProductById,
    deleteProduct
} = require('../controllers/product.controller');

productRouter.post('/', auth, createProduct);
productRouter.get('/', getProducts);
productRouter.put('/:id', auth, updateProductById);
productRouter.delete('/:id', auth, deleteProduct);

module.exports = productRouter;
