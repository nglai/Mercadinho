const express = require('express')
const { selectAllProfiles, selectAllUsers, selectAllProducts, selectByIdProfiles, selectByIdUsers, selectByIdProducts, insertProfiles, insertUsers, insertProducts, updateProfiles, updateUsers, updateProducts, deleteProfiles, deleteUsers, deleteProducts } = require('./controller')

const {insertProfileSchema, insertUsersSchema, insertProductsSchema} = require('../validations/insertValidation')
const {updateProfileSchema, updateUsersSchema, updateProductsSchema} = require('./../validations/updateValidation')
const { validation } = require('../middlewares/validationMiddleware')

const Router = express.Router();

Router.get('/profiles', selectAllProfiles)
Router.get('/users', selectAllUsers)
Router.get('/products', selectAllProducts)

Router.get('/profiles/:id', selectByIdProfiles)
Router.get('/users/:id', selectByIdUsers)
Router.get('/products/:id', selectByIdProducts)

Router.post('/profiles', validation(insertProfileSchema), insertProfiles)
Router.post('/users', validation(insertUsersSchema), insertUsers)
Router.post('/products', validation(insertProductsSchema), insertProducts)

Router.patch('/profiles/:id', validation(updateProfileSchema), updateProfiles)
Router.patch('/users/:id', validation(updateUsersSchema), updateUsers)
Router.patch('/products/:id', validation(updateProductsSchema), updateProducts)

Router.delete('/profiles/:id', deleteProfiles)
Router.delete('/users/:id', deleteUsers)
Router.delete('/products/:id', deleteProducts)


module.exports = Router