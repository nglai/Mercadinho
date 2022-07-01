const express = require('express')
const { selectAllProfiles, selectAllUsers, selectAllProducts, selectByIdProfiles, selectByIdUsers, selectByIdProducts, insertProfiles, insertUsers, insertProducts, updateProfiles, updateUsers, updateProducts, deleteProfiles, deleteUsers, deleteProducts } = require('./controller')

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

module.exports = Router