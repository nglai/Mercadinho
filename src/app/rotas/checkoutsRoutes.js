const express = require('express')
const CheckoutsController = require('../controller/CheckoutsController')

const CheckoutsRouter = express.Router();

CheckoutsRouter
    .get('/checkouts', CheckoutsController.selectAllCheckouts)
    .get('/checkouts/:id', CheckoutsController.selectByIdCheckouts)
    .post('/checkouts', CheckoutsController.insertCheckouts)
    .patch('/checkouts/:id', CheckoutsController.updateCheckouts)

module.exports = CheckoutsRouter