const mysql = require('mysql2');
require('dotenv').config();
const formataData = require('../formataData');

const pool = mysql.createPool({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE
});

const promisePool = pool.promise();

class Services {

    constructor(nomeTabela) {
        this.nomeTabela = nomeTabela;
    };

    async select(colunas, limit, offset) {
        //abstração de array [posição]
        const [rows] = await promisePool.query(`SELECT ${colunas} FROM ${this.nomeTabela} limit ${limit} offset ${offset}`);
        const [count] = await promisePool.query(`SELECT COUNT (*) FROM ${this.nomeTabela}`);
        const total = count[0]["COUNT (*)"];
        return { total, rows };
    };

    //SELECT WHERE
    async selectWhere(colunas, where) {
        try {
            //abstração de array [posição]
            const [data] = await promisePool.query(`SELECT ${colunas} FROM ${this.nomeTabela} WHERE ${where}`);
            return data;
        } catch (error) {
            console.log(error);
        }
    };

    // INSERT
    async insert(colunas, valores) {
        try {
            const values = [];
            for (let index = 0; index < valores.length; index++) {
                let valor = Object.values(valores[index]);
                let valor2 = '("' + valor.join('","') + '")';
                values.push(valor2);
            };
            await promisePool.query(`INSERT INTO ${this.nomeTabela} (${colunas}) VALUES ${values}`);
            console.log('Inserido com sucesso!');
        } catch (error) {
            console.log(error);
        }
    };

    // UPDATE
    async update(colunas, valores, where) {
        try {
            let update = '';
            for (let i = 0; i < colunas.length; i++) {
                if (i == (colunas.length - 1)) {
                    update += colunas[i] + '=' + `"${valores[i]}"`;
                } else {
                    update += colunas[i] + '=' + `"${valores[i]}"` + ",";
                }
            };
            await promisePool.query(`UPDATE ${this.nomeTabela} SET ${update} WHERE ${where} `);
            console.log('Atualizado com sucesso!');
        } catch (error) {
            console.log(error);
        }
    };

    async updateWithUser(userName, colunas, valores, where) {
        try {
            let update = '';
            for (let i = 0; i < colunas.length; i++) {
                if (i == (colunas.length - 1)) {
                    update += colunas[i] + '=' + `"${valores[i]}"`;
                } else {
                    update += colunas[i] + '=' + `"${valores[i]}"` + ",";
                }
            };
            update += `,LAST_UPDATED_USER = "${userName}", LAST_UPDATED_AT = "${formataData(new Date())}"`;

            await promisePool.query(`UPDATE ${this.nomeTabela} SET ${update} WHERE ${where} `);
            console.log('Atualizado com sucesso!');
        } catch (error) {
            console.log(error);
        }
    };

    // DELETE
    async exclude(id) {
        try {
            await promisePool.query(`DELETE FROM ${this.nomeTabela} WHERE ID=${id} `);
            console.log('Deletado com sucesso!');
        } catch (error) {
            console.log(error);
        }
    };

};

module.exports = Services;