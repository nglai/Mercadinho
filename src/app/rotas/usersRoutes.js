const express = require('express')
const { selectAllUsers, selectByIdUsers, insertUsers, updateUsers, deleteUsers, login } = require('../controller')
const { insertUsersSchema } = require('../../validations/insertValidation')
const { updateUsersSchema } = require('../../validations/updateValidation')
const { validation } = require('../../middlewares/validationMiddleware')

const UsersRouter = express.Router();

UsersRouter
    .post('/login', login)
    .get('/users', selectAllUsers)
    .get('/users/:id', selectByIdUsers)
    .post('/users', validation(insertUsersSchema), insertUsers)
    .patch('/users/:id', validation(updateUsersSchema), updateUsers)
    .delete('/users/:id', deleteUsers)

module.exports = UsersRouter
