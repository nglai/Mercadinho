const ProfilesServices = require('../../utils/services/ProfilesServices');
const profilesServices = new ProfilesServices()

class ProfilesController {

    //SELECT ALL
    static async selectAllProfiles(req, res) {
        let { pagina = 1, limit = 10 } = req.query;
        const offset = (pagina - 1) * limit;
        const selectAll = await profilesServices.select("*", limit, offset)
        res.status(200).send(selectAll)
    };

    //SELECT BY ID
    static async selectByIdProfiles(req, res) {
        try {
            const { id } = req.params;

            const [existe] = await profilesServices.selectWhere("ID", `id = ${id}`);
            if (existe === undefined) throw new Error('Perfil com ID passado não existe');

            res.status(200).send(await profilesServices.selectWhere("*", `id = ${id}`));
        } catch (error) {
            res.status(500).send({ error: error.message });
        }
    };

    //INSERT
    static async insertProfiles(req, res) {
        try {
            const colunas = Object.keys(req.body[0]);
            const valores = Object.values(req.body);
            await profilesServices.insert(colunas, valores);
            res.status(201).send('Inserido');
        } catch (error) {
            res.status(500).send({ error: error });
        }
    };

    //UPDATE
    static async updateProfiles(req, res) {
        try {
            const colunas = Object.keys(req.body[0]);
            const valores = Object.values(req.body[0]);
            const { id } = req.params;

            const [existe] = await profilesServices.selectWhere("ID", `id = ${id}`);
            if (existe === undefined) throw new Error('Perfil com ID passado não existe');

            await profilesServices.update(colunas, valores, `id = ${id}`);
            res.status(200).send('Atualizado');
        } catch (error) {
            res.status(500).send({ error: error.message });
        }
    };

    //DELETE
    static async deleteProfiles(req, res) {
        try {
            const { id } = req.params;

            const [existe] = await profilesServices.selectWhere("ID", `id = ${id}`);
            if (existe === undefined) throw new Error('Perfil com ID passado não existe');

            await profilesServices.exclude(id);
            res.status(200).send('Deletado');
        } catch (error) {
            res.status(500).send({ error: error.message });
        }
    };

};

module.exports = ProfilesController;