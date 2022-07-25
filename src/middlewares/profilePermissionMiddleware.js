async function profilePermissionMiddleware(req, res, next) {

    let methods = ["GET", "POST", "DELETE", "PATCH"]

    if (req.path === "/login") {
        next()
    } else {
        const profilesPermission = {
            1: req.dados.profileId === 1,
            2: req.dados.profileId === 2 && req.path.startsWith('/products') && req.method === "GET",
            3: req.dados.profileId === 3 && req.path.startsWith('/products') && (methods.indexOf(req.method) > -1)
        }
        if (profilesPermission[req.dados.profileId]) {
            next()
        } else {
            res.status(401).send("Perfil não autorizado ou rota inexistente")
        }
    }
}

module.exports = profilePermissionMiddleware
//1 Administrador acesso total: profiles, users e products
//2 Caixa acesso: produtos - listar todos e pesquisar pelo nome
//3 Estoquista acesso total: produtos - buscar cadastrar, alterar ou deletar produto