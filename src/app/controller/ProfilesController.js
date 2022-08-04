const { select, selectWhere, insert, update, deletar } = require('../../utils/service')

class ProfilesController {

    //SELECT ALL
    static async selectAllProfiles(req, res) {
        let { pagina = 1, limit = 10 } = req.query;
        const offset = (pagina - 1) * limit;
        const selectAll = await select("*", "profiles", limit, offset)
        res.status(200).send(selectAll)
    };

    //SELECT BY ID
    static async selectByIdProfiles(req, res) {
        try {
            const { id } = req.params

            const [existe] = await selectWhere("ID", "profiles", `id = ${id}`);
            if (existe === undefined) throw new Error('Perfil com ID passado não existe')

            res.status(200).send(await selectWhere("*", "profiles", `id = ${id}`))
        } catch (error) {
            res.status(500).send({ error: error.message })
        }
    };

    //INSERT
    static async insertProfiles(req, res) {
        try {
            const colunas = Object.keys(req.body[0])
            const valores = Object.values(req.body)
            await insert("", 'profiles', colunas, valores)
            res.status(201).send('Inserido')
        } catch (error) {
            res.status(500).send({ error: error })
        }
    };

    //UPDATE
    static async updateProfiles(req, res) {
        try {
            const colunas = Object.keys(req.body[0])
            const valores = Object.values(req.body[0])
            const { id } = req.params

            const [existe] = await selectWhere("ID", "profiles", `id = ${id}`);
            if (existe === undefined) throw new Error('Perfil com ID passado não existe')

            await update("", 'profiles', colunas, valores, `id = ${id}`)
            res.status(200).send('Atualizado')
        } catch (error) {
            res.status(500).send({ error: error.message })
        }
    };

    //DELETE
    static async deleteProfiles(req, res) {
        try {
            const { id } = req.params

            const [existe] = await selectWhere("ID", "profiles", `id = ${id}`);
            if (existe === undefined) throw new Error('Perfil com ID passado não existe')

            await deletar('profiles', id)
            res.status(200).send('Deletado')
        } catch (error) {
            res.status(500).send({ error: error.message })
        }
    };

}

module.exports = ProfilesController