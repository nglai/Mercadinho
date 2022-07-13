const express = require('express')
const IndexRoutes = require('./src/app/rotas/indexRoutes')

const app = express()
app.use(express.json())

app.use(IndexRoutes)

app.listen(4040, () => { console.log('Servidor rodando') })