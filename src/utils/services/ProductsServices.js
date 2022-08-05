const mysql = require('mysql2');
require('dotenv').config();
const formataData = require('../formataData');
const Services = require('./Services');

const pool = mysql.createPool({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE
});

const promisePool = pool.promise();

class ProductsServices extends Services {
    constructor() {
        super('products')
    };

    // INSERT
    async insertProduct(userName, colunas, valores) {
        try {
            const values = []
            for (let index = 0; index < valores.length; index++) {
                let valor = Object.values(valores[index])
                let valor2 = '("' + valor.join('","') + '","' + userName + '","' + formataData(new Date()) + '")'
                values.push(valor2)
            }
            colunas.push("CREATED_USER", "CREATED_AT")

            await promisePool.query(`INSERT INTO ${this.nomeTabela} (${colunas}) VALUES ${values}`)
            console.log('Inserido com sucesso!')
        } catch (error) {
            console.log(error)
        }
    };

};

module.exports = ProductsServices