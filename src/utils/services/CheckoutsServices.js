const mysql = require('mysql2');
require('dotenv').config();
const formataData = require('../formataData');
const Services = require('./Services');
const checkoutProductsServices = new Services('checkout_products');
const productsServices = new Services('products');

const pool = mysql.createPool({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE
});

const promisePool = pool.promise();

class CheckoutsServices extends Services {
    constructor() {
        super('checkouts')
    };

    // CREATE
    async createCheckout(userName, colunas, valores) {
        try {
            const values = [];
            for (let index = 0; index < valores.length; index++) {
                let valor = Object.values(valores[index]);
                let valor2 = '("' + valor.join('","') + '","' + userName + '","' + formataData(new Date()) + '")';
                values.push(valor2);
            }
            colunas.push("CREATED_USER", "CREATED_AT");

            await promisePool.query(`INSERT INTO ${this.nomeTabela} (${colunas}) VALUES ${values}`);
            console.log('Inserido com sucesso!');
        } catch (error) {
            console.log(error);
        }
    };

    // UPDATE
    async updateCheckout(userName, reqBody, id) {
        try {
            const colunas = Object.keys(reqBody[0]);
            const valores = Object.values(reqBody[0]);

            const subtotaisEDescontos = await checkoutProductsServices.selectWhere("SUBTOTAL, PRODUCT_DISCOUNT", `CHECKOUT_ID = ${id} and CANCELED = 0`);
            let somaSubtotais = 0;
            let somaDescontos = 0;
            for (const item of subtotaisEDescontos) {
                somaSubtotais += Number(item['SUBTOTAL'])
                somaDescontos += Number(item['PRODUCT_DISCOUNT'])
            };

            let update = '';
            for (let i = 0; i < colunas.length; i++) {
                if (i == (colunas.length - 1)) {
                    update += colunas[i] + '=' + `"${valores[i]}"`;
                } else {
                    update += colunas[i] + '=' + `"${valores[i]}"` + ",";
                }
            };

            let extraDiscount = reqBody.map(item => item["EXTRA_DISCOUNT"])
            let total = somaSubtotais - extraDiscount

            update += `,TOTAL = ${total.toFixed(2)}, TOTAL_PRODUCTS_DISCOUNTS = ${somaDescontos.toFixed(2)}, LAST_UPDATED_USER = "${userName}", LAST_UPDATED_AT = "${formataData(new Date())}"`;
            await promisePool.query(`UPDATE ${this.nomeTabela} SET ${update} WHERE id = ${id}`);
            console.log('Atualizado com sucesso!');
        } catch (error) {
            console.log(error);
        }
    };

    async finishCheckout(userName, reqBody, id) {
        try {
            const colunas = Object.keys(reqBody[0]);
            const valores = Object.values(reqBody[0]);

            let update = '';
            for (let i = 0; i < colunas.length; i++) {
                if (i == (colunas.length - 1)) {
                    update += colunas[i] + '=' + `"${valores[i]}"`;
                } else {
                    update += colunas[i] + '=' + `"${valores[i]}"` + ",";
                }
            };
            update += `,LAST_UPDATED_USER = "${userName}", LAST_UPDATED_AT = "${formataData(new Date())}"`;

            if (reqBody[0]['CHECKOUT_STATUS_ID'] == 3) {
                //1. Resgatar o produtoId e a quantidade comprada
                const productIdQuantity = await checkoutProductsServices.selectWhere("PRODUCT_ID, QUANTITY", `CHECKOUT_ID = ${id} and CANCELED = 0`);
                let productsId = productIdQuantity.map(item => item['PRODUCT_ID']); //[ 5, 1 ]
                let quantidadesCompradas = productIdQuantity.map(item => item['QUANTITY']); //[ 2, 2 ]

                //2. Resgatar a quantidade de cada produto no estoque
                let quantidadeProdutoEstoque = []; //[ 80, 90 ]
                for (const item of productsId) {
                    const [qtdProd] = await productsServices.selectWhere("QUANTITY", `id = ${item}`);
                    quantidadeProdutoEstoque.push(qtdProd['QUANTITY']);
                };

                //3. Fazer a conta do novo valor no estoque (estoque - compra)
                const novoEstoque = []; //[ 78, 88 ]
                quantidadeProdutoEstoque.forEach((item, index) => {
                    let novoValor = item - quantidadesCompradas[index];
                    novoEstoque.push(novoValor);
                });

                //4. Montar uma query para cada update do produto com a quantidade nova
                //UPDATE nomeTabela SET QUANTITY = novoQuantityCalculado WHERE PRODUCT_ID = produtoId;
                for (let index = 0; index < productsId.length; index++) {
                    productsServices.update(["QUANTITY"], [novoEstoque[index]], `id = ${productsId[index]}`);
                };
            }

            await promisePool.query(`UPDATE ${this.nomeTabela} SET ${update} WHERE id = ${id} `);
            console.log('Atualizado com sucesso!');
        } catch (error) {
            console.log(error);
        }
    };

};

module.exports = CheckoutsServices