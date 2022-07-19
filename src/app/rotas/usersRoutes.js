const express = require('express')
const { selectAllUsers, selectByIdUsers, insertUsers, updateUsers, deleteUsers, login } = require('../controller')
const {insertUsersSchema} = require('../../validations/insertValidation')
const {updateUsersSchema} = require('../../validations/updateValidation')
const { validation } = require('../../middlewares/validationMiddleware')

const UsersRouter = express.Router();

UsersRouter.post('/login', login)

UsersRouter.get('/users', selectAllUsers)

UsersRouter.get('/users/:id', selectByIdUsers)

UsersRouter.post('/users', validation(insertUsersSchema), insertUsers)

UsersRouter.patch('/users/:id', validation(updateUsersSchema), updateUsers)

UsersRouter.delete('/users/:id', deleteUsers)

module.exports = UsersRouter
