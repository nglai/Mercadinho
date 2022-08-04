const express = require('express')
const CheckoutProductsController = require('../controller/CheckoutProductsController')

const CheckoutProductsRouter = express.Router();

CheckoutProductsRouter
    .get('/checkoutProducts', CheckoutProductsController.selectAllCheckoutProducts)
    .get('/checkoutProducts/:id', CheckoutProductsController.selectByIdCheckoutProducts)
    .post('/checkoutProducts', CheckoutProductsController.insertCheckoutProducts)
// .patch('/checkoutProducts/:id', CheckoutProductsController.updateCheckouts)

module.exports = CheckoutProductsRouter;