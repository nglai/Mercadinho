const { select, selectWhere, insert, insertCheckoutProducts, update, deletar } = require('../../utils/service')

class CheckoutProductsController {

    //SELECT ALL
    static async selectAllCheckoutProducts(req, res) {
        let { pagina = 1, limit = 10 } = req.query;
        const offset = (pagina - 1) * limit;
        const selectAll = await select("*", "checkout_products", limit, offset);
        res.status(200).send(selectAll);
    };

    //SELECT BY ID
    static async selectByIdCheckoutProducts(req, res) {
        try {
            const { id } = req.params;

            const [existe] = await selectWhere("ID", "checkout_products", "id", "=", id);
            if (existe === undefined) throw new Error('Checkout do produto com ID passado não existe');
            res.status(200).send(await selectWhere("*", "checkout_products", "id", "=", id));
        } catch (error) {
            res.status(500).send({ error: error.message });
        }
    };

    //INSERT
    static async insertCheckoutProducts(req, res) {
        try {
            const colunas = Object.keys(req.body[0]);
            const valores = Object.values(req.body);

            let idProdutos = valores.map(item => item["PRODUCT_ID"]) //[ 1, 4 ]

            const precos = [] //[ '1.00', '12.00' ]
            for (const item of idProdutos) {
                const selected = await selectWhere("PRICE", "products", "id", "=", item)
                precos.push(selected[0]["PRICE"])
            }

            await insertCheckoutProducts(precos, 'checkout_products', colunas, valores);
            res.status(201).send('Inserido');
        } catch (error) {
            res.status(500).send({ error: error.message });
        }
    };
}

module.exports = CheckoutProductsController;