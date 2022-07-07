const express = require('express')
const { selectAllProfiles, selectAllUsers, selectAllProducts, selectByIdProfiles, selectByIdUsers, selectByIdProducts, insertProfiles, insertUsers, insertProducts, updateProfiles, updateUsers, updateProducts, deleteProfiles, deleteUsers, deleteProducts, insert2, insert3 } = require('./controller')

const {profileSchema, usersSchema, productsSchema} = require('./../validations/validation')
const { validation } = require('../middlewares/validationMiddleware')

const Router = express.Router();

Router.get('/profiles', selectAllProfiles)
Router.get('/users', selectAllUsers)
Router.get('/products', selectAllProducts)

Router.get('/profiles/:id', selectByIdProfiles)
Router.get('/users/:id', selectByIdUsers)
Router.get('/products/:id', selectByIdProducts)

Router.post('/profiles', insertProfiles)
Router.post('/users', insertUsers)
Router.post('/products', insertProducts)

Router.put('/profiles/:id', updateProfiles)
Router.put('/users/:id', updateUsers)
Router.put('/products/:id', updateProducts)

Router.delete('/profiles/:id', deleteProfiles)
Router.delete('/users/:id', deleteUsers)
Router.delete('/products/:id', deleteProducts)

Router.post('/teste', validation(usersSchema), insert2)
Router.post('/teste2', validation(productsSchema), insert3)


module.exports = Router