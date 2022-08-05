const mysql = require('mysql2');
require('dotenv').config();
const Services = require('./Services');
const services = new Services("products")

const pool = mysql.createPool({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE
});

const promisePool = pool.promise();

class CheckoutProductsServices extends Services {
    constructor() {
        super('checkout_products')
    };

    // INSERT
    async insertCheckoutProducts(checkoutId, colunas, valores) {
        try {
            let idProdutos = valores.map(item => item["PRODUCT_ID"])
            const precos = []
            for (const item of idProdutos) {
                const selected = await services.selectWhere("PRICE", `id = ${item}`)
                precos.push(selected[0]["PRICE"])
            }

            const subtotal = []
            let quantidade = valores.map(item => item["QUANTITY"])
            for (let index = 0; index < quantidade.length; index++) {
                if (colunas.includes('PRODUCT_DISCOUNT')) {
                    let desconto = valores.map(item => item["PRODUCT_DISCOUNT"])
                    const sub = (quantidade[index] * precos[index]) - desconto[index];
                    subtotal.push(sub);
                } else {
                    const sub = quantidade[index] * precos[index]
                    subtotal.push(sub);
                }
            }

            const values = []
            for (let index = 0; index < valores.length; index++) {
                let valor = Object.values(valores[index])
                let valor2 = '("' + valor.join('","') + '","' + checkoutId + '","' + precos[index] + '","' + subtotal[index] + '")'
                values.push(valor2)
            }

            colunas.push("CHECKOUT_ID", "PRICE", "SUBTOTAL")

            await promisePool.query(`INSERT INTO ${this.nomeTabela} (${colunas}) VALUES ${values}`)
            console.log('Inserido com sucesso!')
        } catch (error) {
            console.log(error)
        }
    };

    // UPDATE
    async update(userName, colunas, valores, where) {
        try {
            let update = '';
            for (let i = 0; i < colunas.length; i++) {
                if (i == (colunas.length - 1)) {
                    update += colunas[i] + '=' + `"${valores[i]}"`;
                } else {
                    update += colunas[i] + '=' + `"${valores[i]}"` + ",";
                }
            };
            update += `,CANCEL_USER = "${userName}"`;

            await promisePool.query(`UPDATE ${this.nomeTabela} SET ${update} WHERE ${where} `)
            console.log('Atualizado com sucesso!')
        } catch (error) {
            console.log(error)
        }
    };

};

module.exports = CheckoutProductsServices