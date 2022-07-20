const { select, selectWhere, insert, update, deletar } = require('../utils/service')
require('dotenv').config()
const { hash } = require('./../utils/hashPassword')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const userColunas = process.env.USERCOLUNAS

//SELECT ALL
async function selectAllProfiles(req, res) {
    res.status(200).send(await select("*", "profiles"))
}

async function selectAllUsers(req, res) {
    res.status(200).send(await select(userColunas, "users"))
}

async function selectAllProducts(req, res) {
    res.status(200).send(await select("*", "products"))
}

//SELECT BY ID
async function selectByIdProfiles(req, res) {
    try {
        const { id } = req.params

        const [existe] = await selectWhere("ID", "profiles", "id", "=", id);
        if (existe === undefined) throw new Error('Perfil com ID passado não existe')

        res.status(200).send(await selectWhere("*", "profiles", "id", "=", id))
    } catch (error) {
        res.status(500).send({ error: error.message })
    }
}

async function selectByIdUsers(req, res) {
    try {
        const { id } = req.params

        const [existe] = await selectWhere("ID", "users", "id", "=", id);
        if (existe === undefined) throw new Error('Usuário com ID passado não existe')

        res.status(200).send(await selectWhere(userColunas, "users", "id", "=", id))
    } catch (error) {
        res.status(500).send({ error: error.message })
    }
}

async function selectByIdProducts(req, res) {
    try {
        const { id } = req.params

        const [existe] = await selectWhere("ID", "products", "id", "=", id);
        if (existe === undefined) throw new Error('Produto com ID passado não existe')

        res.status(200).send(await selectWhere("*", "products", "id", "=", id))
    } catch (error) {
        res.status(500).send({ error: error.message })
    }
}

//SELECT BY DESCRIPTION
async function selectByDescriptionProducts(req, res) {
    try {
        let description = `%${req.query.description}%`
        let result = await selectWhere("*", "products", "DESCRIPTION", "like", description)
        if (result.length === 0) throw new Error('Não foi encontrado nenhum produto correspondente')
        res.status(200).send(result)
    } catch (error) {
        res.status(404).send({ error: error.message })
    }
}

//INSERT
async function insertProfiles(req, res) {
    try {
        const colunas = Object.keys(req.body[0])
        const valores = Object.values(req.body)
        await insert(req.dados.name, 'profiles', colunas, valores)
        res.status(201).send('Inserido')
    } catch (error) {
        res.status(500).send({ error: error })
    }
}

async function insertUsers(req, res) {
    try {
        const colunas = Object.keys(req.body[0]) //[ 'CPF', 'PASSWORD', 'PROFILE_ID' ]
        const valores = Object.values(req.body) //[ { CPF: '12345678912', PASSWORD: '123456', PROFILE_ID: 1 } ]

        const senhas = []
        for (let index = 0; index < valores.length; index++) {
            const novaSenha = await hash(Object.values(req.body)[index]['PASSWORD'])
            senhas.push(novaSenha)
        }

        const values = req.body.map((item, indice) => ({ ...item, PASSWORD: senhas[indice] }))

        await insert(req.dados.name, 'users', colunas, values)
        res.status(201).send('Inserido')
    } catch (error) {
        res.status(500).send({ error: error.message })
    }
}

async function insertProducts(req, res) {
    try {
        const colunas = Object.keys(req.body[0])
        const valores = Object.values(req.body)
        await insert(req.dados.name, 'products', colunas, valores)
        res.status(201).send('Inserido')
    } catch (error) {
        res.status(500).send({ error: error })
    }
}

//UPDATE
async function updateProfiles(req, res) {
    try {
        const colunas = Object.keys(req.body[0])
        const valores = Object.values(req.body[0])
        const { id } = req.params

        const [existe] = await selectWhere("ID", "profiles", "id", "=", id);
        if (existe === undefined) throw new Error('Perfil com ID passado não existe')

        await update('profiles', colunas, valores, id)
        res.status(200).send('Atualizado')
    } catch (error) {
        res.status(500).send({ error: error.message })
    }
}

async function updateUsers(req, res) {
    try {
        const { id } = req.params
        const colunas = Object.keys(req.body[0])

        const [existe] = await selectWhere("ID", "users", "id", "=", id);
        if (existe === undefined) throw new Error('Usuário com ID passado não existe')

        let valores;
        if (Object.values(req.body)[0]['PASSWORD']) {
            const novaSenha = await hash(Object.values(req.body)[0]['PASSWORD'])
            const values = req.body.map(item => ({ ...item, PASSWORD: novaSenha }))
            const novosValores = Object.values(values[0])
            valores = novosValores
        } else {
            const novosValores = Object.values(req.body[0])
            valores = novosValores
        }

        await update('users', colunas, valores, id)
        res.status(200).send('Atualizado')
    } catch (error) {
        res.status(500).send({ error: error.message })
    }
}

async function updateProducts(req, res) {
    try {
        const colunas = Object.keys(req.body[0])
        const valores = Object.values(req.body[0])
        const { id } = req.params

        const [existe] = await selectWhere("ID", "products", "id", "=", id);
        if (existe === undefined) throw new Error('Produto com ID passado não existe')

        await update('products', colunas, valores, id)
        res.status(200).send('Atualizado')
    } catch (error) {
        res.status(500).send({ error: error.message })
    }
}

//DELETE
async function deleteProfiles(req, res) {
    try {
        const { id } = req.params

        const [existe] = await selectWhere("ID", "profiles", "id", "=", id);
        if (existe === undefined) throw new Error('Perfil com ID passado não existe')

        await deletar('profiles', id)
        res.status(200).send('Deletado')
    } catch (error) {
        res.status(500).send({ error: error.message })
    }
}

async function deleteUsers(req, res) {
    try {
        const { id } = req.params

        const [existe] = await selectWhere("ID", "users", "id", "=", id);
        if (existe === undefined) throw new Error('Usuário com ID passado não existe')

        await deletar('users', id)
        res.status(200).send('Deletado')
    } catch (error) {
        res.status(500).send({ error: error.message })
    }
}

async function deleteProducts(req, res) {
    try {
        const { id } = req.params

        const [existe] = await selectWhere("ID", "products", "id", "=", id);
        if (existe === undefined) throw new Error('Produto com ID passado não existe')

        await deletar('products', id)
        res.status(200).send('Deletado')
    } catch (error) {
        res.status(500).send({ error: error.message })
    }
}

//LOGIN
async function login(req, res) {
    try {
        const { CPF, PASSWORD } = req.body
        const [params] = await selectWhere("ID, NAME, PASSWORD, PROFILE_ID", "users", "CPF", "=", CPF)
        const payload = {
            userId: params.ID,
            name: params.NAME,
            profileId: params.PROFILE_ID
        }

        if (params === undefined) throw new Error('CPF ou Senha incorretos')

        let comparedPw = await bcrypt.compare(PASSWORD, params.PASSWORD);

        if (comparedPw) {
            const token = jwt.sign(payload, process.env.SECRET, { expiresIn: '12h' })
            res.json({ token })

        } else {
            throw new Error('CPF ou Senha incorretos')
        }
    } catch (error) {
        res.status(401).send({ error: error.message })
    }
}

module.exports = { selectAllProfiles, selectAllUsers, selectAllProducts, selectByIdProfiles, selectByIdUsers, selectByIdProducts, selectByDescriptionProducts, insertProfiles, insertUsers, insertProducts, updateProfiles, updateUsers, updateProducts, deleteProfiles, deleteUsers, deleteProducts, login }