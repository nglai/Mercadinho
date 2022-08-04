const { select, selectWhere, insert, update, deletar } = require('../../utils/service')

class ProductsController {

    //SELECT ALL
    static async selectAllProducts(req, res) {
        let { pagina = 1, limit = 10 } = req.query;
        const offset = (pagina - 1) * limit;
        const selectAll = await select("*", "products", limit, offset);
        res.status(200).send(selectAll);
    };

    //SELECT BY ID
    static async selectByIdProducts(req, res) {
        try {
            const { id } = req.params;

            const [existe] = await selectWhere("ID", "products", `id = ${id}`);
            if (existe === undefined) throw new Error('Produto com ID passado não existe');
            res.status(200).send(await selectWhere("*", "products", `id = ${id}`));
        } catch (error) {
            res.status(500).send({ error: error.message });
        }
    };

    //SELECT BY DESCRIPTION
    static async selectByDescriptionProducts(req, res) {
        try {
            let description = `"%${req.query.description}%"`;
            let result = await selectWhere("*", "products", `DESCRIPTION like ${description}`);
            if (result.length === 0) throw new Error('Não foi encontrado nenhum produto correspondente');
            res.status(200).send(result);
        } catch (error) {
            res.status(404).send({ error: error.message });
        }
    };

    //INSERT
    static async insertProducts(req, res) {
        try {
            const colunas = Object.keys(req.body[0]);
            const valores = Object.values(req.body);
            await insert(req.dados.name, 'products', colunas, valores);
            res.status(201).send('Inserido');
        } catch (error) {
            res.status(500).send({ error: error.message });
        }
    };

    //UPDATE
    static async updateProducts(req, res) {
        try {
            const colunas = Object.keys(req.body[0]);
            const valores = Object.values(req.body[0]);
            const { id } = req.params;

            const [existe] = await selectWhere("ID", "products", `id = ${id}`);
            if (existe === undefined) throw new Error('Produto com ID passado não existe');

            await update(req.dados.name, 'products', colunas, valores, `id = ${id}`);
            res.status(200).send('Atualizado');
        } catch (error) {
            res.status(500).send({ error: error.message });
        }
    };

    //DELETE
    static async deleteProducts(req, res) {
        try {
            const { id } = req.params;

            const [existe] = await selectWhere("ID", "products", `id = ${id}`);
            if (existe === undefined) throw new Error('Produto com ID passado não existe');

            await deletar('products', id);
            res.status(200).send('Deletado');
        } catch (error) {
            res.status(500).send({ error: error.message });
        }
    };

}

module.exports = ProductsController;