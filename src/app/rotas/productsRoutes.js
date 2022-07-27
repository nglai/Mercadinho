const express = require('express')
const { selectAllProducts, selectByIdProducts, selectByDescriptionProducts, insertProducts, updateProducts, deleteProducts } = require('../controller')

const { insertProductsSchema } = require('../../validations/insertValidation')
const { updateProductsSchema } = require('../../validations/updateValidation')
const { validation } = require('../../middlewares/validationMiddleware')

const ProductsRouter = express.Router();

ProductsRouter
    .get('/products', selectAllProducts)
    .get('/products/search', selectByDescriptionProducts)
    .get('/products/:id', selectByIdProducts)
    .post('/products', validation(insertProductsSchema), insertProducts)
    .patch('/products/:id', validation(updateProductsSchema), updateProducts)
    .delete('/products/:id', deleteProducts)

module.exports = ProductsRouter