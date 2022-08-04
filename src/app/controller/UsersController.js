const { select, selectWhere, insert, update, deletar } = require('../../utils/service');
require('dotenv').config();
const { hash } = require('../../utils/hashPassword');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const userColunas = process.env.USERCOLUNAS;

class UsersController {

    //SELECT ALL
    static async selectAllUsers(req, res) {
        let { pagina = 1, limit = 10 } = req.query;
        const offset = (pagina - 1) * limit;
        res.status(200).send(await select(userColunas, "users", limit, offset));
    };

    //SELECT BY ID
    static async selectByIdUsers(req, res) {
        try {
            const { id } = req.params;

            const [existe] = await selectWhere("ID", "users", "id", "=", id);
            if (existe === undefined) throw new Error('Usuário com ID passado não existe');

            res.status(200).send(await selectWhere(userColunas, "users", "id", "=", id));
        } catch (error) {
            res.status(500).send({ error: error.message });
        }
    };

    //INSERT
    static async insertUsers(req, res) {
        try {
            const colunas = Object.keys(req.body[0]);

            const values = await Promise.all(
                req.body.map(async (item, index) => ({
                    ...item,
                    PASSWORD: await hash(Object.values(req.body)[index]['PASSWORD'])
                }))
            );

            await insert(req.dados.name, 'users', colunas, values);
            res.status(201).send('Inserido');
        } catch (error) {
            res.status(500).send({ error: error.message });
        }
    };

    //UPDATE
    static async updateUsers(req, res) {
        try {
            const { id } = req.params;
            const colunas = Object.keys(req.body[0]);

            const [existe] = await selectWhere("ID", "users", "id", "=", id);
            if (existe === undefined) throw new Error('Usuário com ID passado não existe');

            let valores;
            if (Object.values(req.body)[0]['PASSWORD']) {
                const novaSenha = await hash(Object.values(req.body)[0]['PASSWORD']);
                const values = req.body.map(item => ({ ...item, PASSWORD: novaSenha }));
                const novosValores = Object.values(values[0]);
                valores = novosValores;
            } else {
                const novosValores = Object.values(req.body[0]);
                valores = novosValores;
            };

            await update(req.dados.name, 'users', colunas, valores, id);
            res.status(200).send('Atualizado');
        } catch (error) {
            res.status(500).send({ error: error.message });
        }
    };

    //DELETE
    static async deleteUsers(req, res) {
        try {
            const { id } = req.params;

            const [existe] = await selectWhere("ID", "users", "id", "=", id);
            if (existe === undefined) throw new Error('Usuário com ID passado não existe');

            await deletar('users', id);
            res.status(200).send('Deletado');
        } catch (error) {
            res.status(500).send({ error: error.message });
        }
    };

    //LOGIN
    static async login(req, res) {
        try {
            const { CPF, PASSWORD } = req.body;
            const [params] = await selectWhere("ID, NAME, PASSWORD, PROFILE_ID", "users", "CPF", "=", CPF);
            const payload = {
                userId: params.ID,
                name: params.NAME,
                profileId: params.PROFILE_ID
            };

            if (params === undefined) throw new Error('CPF ou Senha incorretos');

            let comparedPw = await bcrypt.compare(PASSWORD, params.PASSWORD);

            if (comparedPw) {
                const token = jwt.sign(payload, process.env.SECRET, { expiresIn: '12h' });
                res.json({ token });

            } else {
                throw new Error('CPF ou Senha incorretos');
            };
        } catch (error) {
            res.status(401).send({ error: error.message });
        }
    };

}

module.exports = UsersController