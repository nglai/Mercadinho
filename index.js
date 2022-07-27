const express = require('express')
const indexRoutes = require('./src/app/rotas/indexRoutes')

const app = express()

indexRoutes(app)

app.listen(4040, () => { console.log('Servidor rodando') })