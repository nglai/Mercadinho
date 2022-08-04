const express = require('express')
const ProductsController = require('../controller/ProductsController')

const { insertProductsSchema } = require('../../validations/insertValidation')
const { updateProductsSchema } = require('../../validations/updateValidation')
const { validation } = require('../../middlewares/validationMiddleware')

const ProductsRouter = express.Router();

ProductsRouter
    .get('/products', ProductsController.selectAllProducts)
    .get('/products/search', ProductsController.selectByDescriptionProducts)
    .get('/products/:id', ProductsController.selectByIdProducts)
    .post('/products', validation(insertProductsSchema), ProductsController.insertProducts)
    .patch('/products/:id', validation(updateProductsSchema), ProductsController.updateProducts)
    .delete('/products/:id', ProductsController.deleteProducts)

module.exports = ProductsRouter