const express = require('express')
const CheckoutsController = require('../controller/CheckoutsController')
const CheckoutProductsController = require('../controller/CheckoutProductsController')

const CheckoutsRouter = express.Router();

CheckoutsRouter
    //rotas dos checkouts
    .get('/checkouts', CheckoutsController.selectAllCheckouts)
    .get('/checkouts/:id', CheckoutsController.selectCheckoutById)
    .post('/checkouts', CheckoutsController.createCheckout)
    .patch('/checkouts/:id', CheckoutsController.updateCheckout)
    .patch('/checkouts/:id/finish', CheckoutsController.finishCheckout)
    //rotas do checkout_products
    .get('/checkout/:checkoutId/products', CheckoutProductsController.selectAllCheckoutProducts)
    .post('/checkout/:checkoutId/addProducts', CheckoutProductsController.insertCheckoutProducts)
    .patch('/checkout/:checkoutId/cancelProduct/:item', CheckoutProductsController.updateCheckoutProducts)

module.exports = CheckoutsRouter