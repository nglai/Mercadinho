const express = require('express')
const ProfilesRouter = require('./profilesRoutes')
const UsersRouter = require('./usersRoutes')
const ProductsRouter = require('./productsRoutes')
const verifyJWT = require('../../middlewares/authMiddleware')
const profilePermissionMiddleware = require('../../middlewares/profilePermissionMiddleware')

const indexRoutes = (app) => {
    app.route('/').get((req, res) => {
        res.status(200).send("Bem vindo ao mercadinho!")
    })

    app.use(
        express.json(),
        verifyJWT,
        profilePermissionMiddleware,
        ProfilesRouter,
        UsersRouter,
        ProductsRouter
    )
}

module.exports = indexRoutes