function profilePermissionMiddleware (req, res, next){

    let adm = req.dados.profileId === 1
    let caixa = req.dados.profileId === 2 && req.path === "/productsdesc" || req.path !== "/products" && req.method === "GET"
    let estoq = req.dados.profileId === 3 && req.path === "/products"

    if(req.path === "/login"){
        next()
    } else {
        if(adm){
            next()
        } else if (caixa){
            next()
        } else if(estoq){
            next()
        } else {
            res.status(401).send("Perfil não autorizado")
        }
    }
}


module.exports = profilePermissionMiddleware
//1 Administrador acesso total: profiles, users e products
//2 Caixa acesso: produtos - listar todos e pesquisar pelo nome
//3 Estoquista acesso total: produtos - buscar cadastrar, alterar ou deletar produto