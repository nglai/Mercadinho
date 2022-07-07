const express = require('express')
const Router = require('./src/app/routes')

const app = express()
app.use(express.json())

app.use(Router)

app.listen(4040, () => { console.log('Servidor rodando') })