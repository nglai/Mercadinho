const mysql = require('mysql2');
require('dotenv').config()
const formataData = require('../utils/formataData')

const pool = mysql.createPool({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE
});

const promisePool = pool.promise();

// SELECT
// async function select(colunas, nomeTabela) {
//     //abstração de array [posição]
//     const [data] = await promisePool.query(`SELECT ${colunas} FROM ${nomeTabela}`);
//     return data
// }
async function select(colunas, nomeTabela, limit, offset) {
    //abstração de array [posição]
    const [rows] = await promisePool.query(`SELECT ${colunas} FROM ${nomeTabela} limit ${limit} offset ${offset}`);
    const [count] = await promisePool.query(`SELECT COUNT (*) FROM ${nomeTabela}`);
    const total = count[0]["COUNT (*)"]
    return { total, rows }
}

//SELECT WHERE
async function selectWhere(colunas, nomeTabela, condicaoColuna, operador, condicaoValor) {
    try {
        //abstração de array [posição]
        const [data] = await promisePool.query(`SELECT ${colunas} FROM ${nomeTabela} WHERE ${condicaoColuna} ${operador} "${condicaoValor}"`);
        return data;
    } catch (error) {
        console.log(error)
    }
}

// INSERT
async function insert(userName, nomeTabela, colunas, valores) {
    try {
        const tablesWithDateAndUser = ["products", "users", "checkouts"]
        const dateTime = formataData(new Date());

        const values = []

        for (let index = 0; index < valores.length; index++) {
            let valor = Object.values(valores[index])
            let valor2;
            if (tablesWithDateAndUser.indexOf(nomeTabela) > -1) {
                valor2 = '("' + valor.join('","') + '","' + userName + '","' + dateTime + '")'
            } else {
                valor2 = '("' + valor.join('","') + '")'
            }
            values.push(valor2)
        }
        if (tablesWithDateAndUser.indexOf(nomeTabela) > -1) {
            colunas.push("CREATED_USER", "CREATED_AT")
        }

        await promisePool.query(`INSERT INTO ${nomeTabela} (${colunas}) VALUES ${values}`)
        console.log('Inserido com sucesso!')
    } catch (error) {
        console.log(error)
    }
}

// INSERT CheckoutProducts
async function insertCheckoutProducts(precos, nomeTabela, colunas, valores) {
    try {

        const values = []

        for (let index = 0; index < valores.length; index++) {
            let valor = Object.values(valores[index])
            let valor2 = '("' + valor.join('","') + '","' + precos[index] + '")'
            values.push(valor2)
        }

        colunas.push("PRICE")

        await promisePool.query(`INSERT INTO ${nomeTabela} (${colunas}) VALUES ${values}`)
        console.log('Inserido com sucesso!')
    } catch (error) {
        console.log(error)
    }
}

// UPDATE
async function update(userName, nomeTabela, colunas, valores, id) {
    try {
        const tablesWithDateAndUser = ["products", "users", "checkouts"]

        const dateTime = formataData(new Date());

        let update = '';
        for (let i = 0; i < colunas.length; i++) {
            if (i == (colunas.length - 1)) {
                update += colunas[i] + '=' + `"${valores[i]}"`
            } else {
                update += colunas[i] + '=' + `"${valores[i]}"` + ","
            }
        }

        if (tablesWithDateAndUser.indexOf(nomeTabela) > -1) {
            update += `,LAST_UPDATED_USER = "${userName}", LAST_UPDATED_AT = "${dateTime}"`
        }

        await promisePool.query(`UPDATE ${nomeTabela} SET ${update} WHERE ID=${id} `)
        console.log('Atualizado com sucesso!')
    } catch (error) {
        console.log(error)
    }
}

// DELETE
async function deletar(nomeTabela, id) {
    try {
        await promisePool.query(`DELETE FROM ${nomeTabela} WHERE ID=${id} `)
        console.log('Deletado com sucesso!')
    } catch (error) {
        console.log(error)
    }
}

module.exports = { select, selectWhere, insert, insertCheckoutProducts, update, deletar }