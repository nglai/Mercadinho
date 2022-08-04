const { select, selectWhere, insert, update, deletar } = require('../../utils/service')

class CheckoutsController {

    //SELECT ALL
    static async selectAllCheckouts(req, res) {
        let { pagina = 1, limit = 10 } = req.query;
        const offset = (pagina - 1) * limit;
        const selectAll = await select("*", "checkouts", limit, offset);
        res.status(200).send(selectAll);
    };

    //SELECT BY ID
    static async selectByIdCheckouts(req, res) {
        try {
            const { id } = req.params;

            const [existe] = await selectWhere("ID", "checkouts", "id", "=", id);
            if (existe === undefined) throw new Error('Checkout com ID passado não existe');

            res.status(200).send(await selectWhere("*", "checkouts", "id", "=", id));
        } catch (error) {
            res.status(500).send({ error: error.message });
        }
    };

    //INSERT
    static async insertCheckouts(req, res) {
        try {
            const colunas = Object.keys(req.body[0]);
            const valores = Object.values(req.body);
            await insert(req.dados.name, 'checkouts', colunas, valores);
            res.status(201).send('Inserido');
        } catch (error) {
            res.status(500).send({ error: error.message });
        }
    };

    //UPDATE
    static async updateCheckouts(req, res) {
        try {
            const colunas = Object.keys(req.body[0]);
            const valores = Object.values(req.body[0]);
            const { id } = req.params;

            const [existe] = await selectWhere("ID", "checkouts", "id", "=", id);
            if (existe === undefined) throw new Error('Checkout com ID passado não existe');

            await update(req.dados.name, 'checkouts', colunas, valores, id);
            res.status(200).send('Atualizado');
        } catch (error) {
            res.status(500).send({ error: error.message });
        }
    };
}

module.exports = CheckoutsController;