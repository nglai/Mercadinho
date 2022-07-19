const {select} = require('../utils/service')

async function profilePermissionMiddleware(req, res, next) {

    let selectProductsId = await select("ID", "products")
    let productsId = selectProductsId.map(item => Object.values(item)) //[ [ 1 ], [ 2 ], [ 4 ], [ 5 ] ]
    let arrayProductsPath = productsId.map(item => `/products/${item}`);
    arrayProductsPath.push('/products', '/products.search')

    let methods = ["GET", "POST", "DELETE", "PATCH"]

    if(req.path === "/login"){
        next()
    } else {
        let adm = req.dados.profileId === 1
        let caixa = req.dados.profileId === 2 && (arrayProductsPath.indexOf(req.path) > -1) && req.method === "GET"
        let estoq = req.dados.profileId === 3 && (arrayProductsPath.indexOf(req.path) > -1) && (methods.indexOf(req.method) > -1)
        if(adm){
            next()
        } else if (caixa){
            next()
        } else if(estoq){
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