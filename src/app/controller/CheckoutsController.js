const CheckoutsServices = require('../../utils/services/CheckoutsServices');
const checkoutsServices = new CheckoutsServices;

class CheckoutsController {

    //SELECT ALL
    static async selectAllCheckouts(req, res) {
        let { pagina = 1, limit = 10 } = req.query;
        const offset = (pagina - 1) * limit;
        const selectAll = await checkoutsServices.select("*", limit, offset);
        res.status(200).send(selectAll);
    };

    //SELECT BY ID
    static async selectCheckoutById(req, res) {
        try {
            const { id } = req.params;

            const [existe] = await checkoutsServices.selectWhere("ID", `id = ${id}`);
            if (existe === undefined) throw new Error('Checkout com ID passado não existe');

            res.status(200).send(await checkoutsServices.selectWhere("*", `id = ${id}`));
        } catch (error) {
            res.status(500).send({ error: error.message });
        }
    };

    //INSERT
    static async createCheckout(req, res) {
        try {
            const colunas = Object.keys(req.body[0]);
            const valores = Object.values(req.body);
            await checkoutsServices.createCheckout(req.dados.name, colunas, valores);
            res.status(201).send('Inserido');
        } catch (error) {
            res.status(500).send({ error: error.message });
        }
    };

    //UPDATE
    static async updateCheckout(req, res) {
        try {
            const { id } = req.params;

            const [existe] = await checkoutsServices.selectWhere("ID", `id = ${id}`);
            if (existe === undefined) throw new Error('Checkout com ID passado não existe');

            await checkoutsServices.updateCheckout(req.dados.name, req.body, id);
            res.status(200).send('Atualizado');
        } catch (error) {
            res.status(500).send({ error: error.message });
        }
    };

    static async finishCheckout(req, res) {
        try {
            const colunas = Object.keys(req.body[0]);
            const valores = Object.values(req.body[0]);

            const { id } = req.params;

            const [existe] = await checkoutsServices.selectWhere("ID", `id = ${id}`);
            if (existe === undefined) throw new Error('Checkout com ID passado não existe');

            await checkoutsServices.updateWithUser(req.dados.name, colunas, valores, `id = ${id}`);
            res.status(200).send('Atualizado');
        } catch (error) {
            res.status(500).send({ error: error.message });
        }
    };
};

module.exports = CheckoutsController;