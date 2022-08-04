const express = require('express')
const UsersController = require('../controller/UsersController')
const { insertUsersSchema } = require('../../validations/insertValidation')
const { updateUsersSchema } = require('../../validations/updateValidation')
const { validation } = require('../../middlewares/validationMiddleware')

const UsersRouter = express.Router();

UsersRouter
    .post('/login', UsersController.login)
    .get('/users', UsersController.selectAllUsers)
    .get('/users/:id', UsersController.selectByIdUsers)
    .post('/users', validation(insertUsersSchema), UsersController.insertUsers)
    .patch('/users/:id', validation(updateUsersSchema), UsersController.updateUsers)
    .delete('/users/:id', UsersController.deleteUsers)

module.exports = UsersRouter
