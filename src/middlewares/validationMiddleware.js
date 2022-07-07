const validation = (schema) => async (req, res, next) => {
    const valores = Object.values(req.body)
    try {
        for (let index = 0; index < valores.length; index++) {
            await schema.validate(valores[index])
        }
        next();
    } catch (error) {
        return res.status(400).send(error.errors)
    }
}

module.exports = {validation}