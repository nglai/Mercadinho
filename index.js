const express = require('express')
const IndexRoutes = require('./src/app/rotas/indexRoutes')
const verifyJWT = require('./src/middlewares/authMiddleware')
const profilePermissionMiddleware = require('./src/middlewares/profilePermissionMiddleware')

const app = express()
app.use(express.json())

app.use(verifyJWT, profilePermissionMiddleware, IndexRoutes)

app.listen(4040, () => { console.log('Servidor rodando') })