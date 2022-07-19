const ProfilesRouter = require('./profilesRoutes')
const UsersRouter = require('./usersRoutes')
const ProductsRouter = require('./productsRoutes')

const IndexRoutes = [ProfilesRouter, UsersRouter, ProductsRouter]

module.exports = IndexRoutes