const mysql = require('mysql2');
require('dotenv').config();
const formataData = require('../formataData');
const { hash } = require('../hashPassword');
const Services = require('./Services');

const pool = mysql.createPool({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE
});

const promisePool = pool.promise();

class UsersServices extends Services {
    constructor() {
        super('users')
    };

    // INSERT
    async insertUser(userName, reqBody) {
        try {
            const colunas = Object.keys(reqBody[0]);
            const valores = await Promise.all(
                reqBody.map(async (item, index) => ({
                    ...item,
                    PASSWORD: await hash(Object.values(reqBody)[index]['PASSWORD'])
                }))
            );

            const values = [];
            for (let index = 0; index < valores.length; index++) {
                let valor = Object.values(valores[index]);
                let valor2 = '("' + valor.join('","') + '","' + userName + '","' + formataData(new Date()) + '")';
                values.push(valor2);
            };
            colunas.push("CREATED_USER", "CREATED_AT");

            await promisePool.query(`INSERT INTO ${this.nomeTabela} (${colunas}) VALUES ${values}`);
            console.log('Inserido com sucesso!');
        } catch (error) {
            console.log(error);
        }
    };

    // UPDATE
    async updateUser(userName, reqBody, where) {
        try {
            const colunas = Object.keys(reqBody[0]);
            let valores;
            if (Object.values(reqBody)[0]['PASSWORD']) {
                const novaSenha = await hash(Object.values(reqBody)[0]['PASSWORD']);
                const values = reqBody.map(item => ({ ...item, PASSWORD: novaSenha }));
                const novosValores = Object.values(values[0]);
                valores = novosValores;
            } else {
                const novosValores = Object.values(reqBody[0]);
                valores = novosValores;
            };

            let update = '';
            for (let i = 0; i < colunas.length; i++) {
                if (i == (colunas.length - 1)) {
                    update += colunas[i] + '=' + `"${valores[i]}"`;
                } else {
                    update += colunas[i] + '=' + `"${valores[i]}"` + ",";
                }
            }
            update += `,LAST_UPDATED_USER = "${userName}", LAST_UPDATED_AT = "${formataData(new Date())}"`;

            await promisePool.query(`UPDATE ${this.nomeTabela} SET ${update} WHERE ${where}`);
            console.log('Atualizado com sucesso!');
        } catch (error) {
            console.log(error);
        }
    };
};

module.exports = UsersServices