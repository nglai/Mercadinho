const express = require('express')
const { selectAllProducts, selectByIdProducts, selectByDescriptionProducts, insertProducts, updateProducts, deleteProducts } = require('../controller')

const { insertProductsSchema} = require('../../validations/insertValidation')
const { updateProductsSchema} = require('../../validations/updateValidation')
const { validation } = require('../../middlewares/validationMiddleware')

const ProductsRouter = express.Router();

ProductsRouter.get('/products', selectAllProducts)

ProductsRouter.get('/products/:id', selectByIdProducts)

ProductsRouter.get('/products.search', selectByDescriptionProducts)

ProductsRouter.post('/products', validation(insertProductsSchema), insertProducts)

ProductsRouter.patch('/products/:id', validation(updateProductsSchema), updateProducts)

ProductsRouter.delete('/products/:id', deleteProducts)


module.exports = ProductsRouter