const express = require('express')
const { select, insert, update, deletar, selectById } = require('./src/utils/bancodedados');

const app = express()
app.use(express.json())

app.get('/profiles', async (req, res) => {
    res.send(await select('profiles'))
});

//SELECT * FROM product WHERE PRODUCT_ID=2;
app.get('/product/:id', async(req, res) => {
    try {
        const {id} = req.params
        res.send(await selectById("product", "PRODUCT_ID", id))
    } catch (error) {
        res.status(500).send({error: error})
    }
});

app.post('/profiles', async(req, res) => {
    try {
        const {colunas, valores} = req.body
        await insert('profiles', colunas, `"${valores}"`)
        res.status(201).send('Inserido')
    } catch (error) {
        res.status(500).send({error: error})
    }
})

app.post('/users', async(req, res) => {
    try {
        const {colunas, valores} = req.body
        await insert('users', colunas, valores)
        res.status(201).send('Inserido')
    } catch (error) {
        res.status(500).send({error: error})
    }
})

app.post('/product', async(req, res) => {
    try {
        const {colunas, valores} = req.body
        await insert('product', colunas, valores)
        res.status(201).send('Inserido')
    } catch (error) {
        res.status(500).send({error: error})
    }
})


app.put('/profiles/:id', async(req, res) => {
    try {
        const {colunas, valores} = req.body
        const {id} = req.params
        await update('profiles',colunas, valores, 'PROFILE_ID', id)
        res.status(200).send('Atualizado')
    } catch (error) {
        res.status(500).send({error: error})
    }
})

app.put('/product/:id', async(req, res) => {
    try {
        const {colunas, valores} = req.body
        const {id} = req.params
        await update('product', colunas, valores, 'PRODUCT_ID', id)
        res.status(200).send('Atualizado')
    } catch (error) {
        res.status(500).send({error: error})
    }
})

app.delete('/profiles/:id', async(req, res) => {
    try {
        const {id} = req.params
        await deletar('profiles', 'PROFILE_ID', id)
        res.status(200).send('Deletado')
    } catch (error) {
        res.status(500).send({error: error})
    }
})

app.listen(4040, () => { console.log('Servidor rodando') })