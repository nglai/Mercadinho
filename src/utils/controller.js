const { select, selectById, insert, update, deletar } = require('./service')

//SELECT ALL
async function selectAllProfiles(req, res) {
    res.status(200).send(await select('profiles'))
}

async function selectAllUsers(req, res) {
    res.status(200).send(await select('users'))
}

async function selectAllProducts(req, res) {
    res.status(200).send(await select('products'))
}

//SELECT BY ID
async function selectByIdProfiles(req, res) {
    try {
        const { id } = req.params
        res.status(200).send(await selectById("profiles", id))
    } catch (error) {
        res.status(500).send({ error: error })
    }
}

async function selectByIdUsers(req, res) {
    try {
        const { id } = req.params
        res.status(200).send(await selectById("users", id))
    } catch (error) {
        res.status(500).send({ error: error })
    }
}

async function selectByIdProducts(req, res) {
    try {
        const { id } = req.params
        res.status(200).send(await selectById("products", id))
    } catch (error) {
        res.status(500).send({ error: error })
    }
}

//INSERT
async function insertProfiles(req, res) {
    try {
        const { colunas, valores } = req.body
        await insert('profiles', colunas, valores)
        res.status(201).send('Inserido')
    } catch (error) {
        res.status(500).send({ error: error })
    }
}

async function insertUsers(req, res) {
    try {
        const { colunas, valores } = req.body
        await insert('users', colunas, valores)
        res.status(201).send('Inserido')
    } catch (error) {
        res.status(500).send({ error: error })
    }
}

async function insertProducts(req, res) {
    try {
        const { colunas, valores } = req.body
        await insert('products', colunas, valores)
        res.status(201).send('Inserido')
    } catch (error) {
        res.status(500).send({ error: error })
    }
}

//UPDATE
async function updateProfiles(req, res) {
    try {
        const { colunas, valores } = req.body
        const { id } = req.params
        await update('profiles', colunas, valores, id)
        res.status(200).send('Atualizado')
    } catch (error) {
        res.status(500).send({ error: error })
    }
}

async function updateUsers(req, res) {
    try {
        const { colunas, valores } = req.body
        const { id } = req.params
        await update('users', colunas, valores, id)
        res.status(200).send('Atualizado')
    } catch (error) {
        res.status(500).send({ error: error })
    }
}

async function updateProducts(req, res) {
    try {
        const { colunas, valores } = req.body
        const { id } = req.params
        await update('products', colunas, valores, id)
        res.status(200).send('Atualizado')
    } catch (error) {
        res.status(500).send({ error: error })
    }
}

//DELETE
async function deleteProfiles(req, res) {
    try {
        const { id } = req.params
        await deletar('profiles', id)
        res.status(200).send('Deletado')
    } catch (error) {
        res.status(500).send({ error: error })
    }
}

async function deleteUsers(req, res) {
    try {
        const { id } = req.params
        await deletar('users', id)
        res.status(200).send('Deletado')
    } catch (error) {
        res.status(500).send({ error: error })
    }
}

async function deleteProducts(req, res) {
    try {
        const { id } = req.params
        await deletar('products', id)
        res.status(200).send('Deletado')
    } catch (error) {
        res.status(500).send({ error: error })
    }
}

module.exports = { selectAllProfiles, selectAllUsers, selectAllProducts, selectByIdProfiles, selectByIdUsers, selectByIdProducts, insertProfiles, insertUsers, insertProducts, updateProfiles, updateUsers, updateProducts, deleteProfiles, deleteUsers, deleteProducts }