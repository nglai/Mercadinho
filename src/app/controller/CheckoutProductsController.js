const CheckoutProductsServices = require('../../utils/services/CheckoutProductsServices');
const checkoutProductsServices = new CheckoutProductsServices;

class CheckoutProductsController {

    //SELECT ALL
    static async selectAllCheckoutProducts(req, res) {
        const checkoutId = req.params;
        const selectAll = await checkoutProductsServices.selectWhere("*", `CHECKOUT_ID = ${checkoutId.checkoutId}`);
        res.status(200).send(selectAll);
    };

    //INSERT
    static async insertCheckoutProducts(req, res) {
        try {
            const checkoutId = req.params;
            const colunas = Object.keys(req.body[0]);
            const valores = Object.values(req.body);
            await checkoutProductsServices.insertCheckoutProducts(checkoutId.checkoutId, colunas, valores);
            res.status(201).send('Inserido');
        } catch (error) {
            res.status(500).send({ error: error.message });
        }
    };

    //UPDATE
    static async updateCheckoutProducts(req, res) {
        try {
            const colunas = Object.keys(req.body[0]);
            const valores = Object.values(req.body[0]);
            const { checkoutId, item } = req.params;

            const [existe] = await checkoutProductsServices.selectWhere("ITEM", `CHECKOUT_ID = ${checkoutId} and ITEM = ${item}`);
            if (existe === undefined) throw new Error('Item não registrado na compra');

            await checkoutProductsServices.update(req.dados.name, colunas, valores, `CHECKOUT_ID = ${checkoutId} and ITEM = ${item}`);
            res.status(200).send('Atualizado');
        } catch (error) {
            res.status(500).send({ error: error.message });
        }
    };
};

module.exports = CheckoutProductsController;