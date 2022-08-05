const UsersServices = require('../../utils/services/UsersServices');
const usersServices = new UsersServices();
require('dotenv').config();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const userColunas = process.env.USERCOLUNAS;

class UsersController {

    //SELECT ALL
    static async selectAllUsers(req, res) {
        let { pagina = 1, limit = 10 } = req.query;
        const offset = (pagina - 1) * limit;
        res.status(200).send(await usersServices.select(userColunas, limit, offset));
    };

    //SELECT BY ID
    static async selectByIdUsers(req, res) {
        try {
            const { id } = req.params;

            const [existe] = await usersServices.selectWhere("ID", `id = ${id}`);
            if (existe === undefined) throw new Error('Usuário com ID passado não existe');

            res.status(200).send(await usersServices.selectWhere(userColunas, `id = ${id}`));
        } catch (error) {
            res.status(500).send({ error: error.message });
        }
    };

    //INSERT
    static async insertUsers(req, res) {
        try {
            await usersServices.insertUser(req.dados.name, req.body);
            res.status(201).send('Inserido');
        } catch (error) {
            res.status(500).send({ error: error.message });
        }
    };

    //UPDATE
    static async updateUsers(req, res) {
        try {
            const { id } = req.params;

            const [existe] = await usersServices.selectWhere("ID", `id = ${id}`);
            if (existe === undefined) throw new Error('Usuário com ID passado não existe');

            await usersServices.updateUser(req.dados.name, req.body, `id = ${id}`);
            res.status(200).send('Atualizado');
        } catch (error) {
            res.status(500).send({ error: error.message });
        }
    };

    //DELETE
    static async deleteUsers(req, res) {
        try {
            const { id } = req.params;

            const [existe] = await usersServices.selectWhere("ID", `id = ${id}`);
            if (existe === undefined) throw new Error('Usuário com ID passado não existe');

            await usersServices.exclude(id);
            res.status(200).send('Deletado');
        } catch (error) {
            res.status(500).send({ error: error.message });
        }
    };

    //LOGIN
    static async login(req, res) {
        try {
            const { CPF, PASSWORD } = req.body;
            const [params] = await usersServices.selectWhere("ID, NAME, PASSWORD, PROFILE_ID", `CPF = "${CPF}"`);
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

};

module.exports = UsersController