const jwt = require("jsonwebtoken");
require('dotenv').config()

function verifyJWT(req, res, next) {
    if(req.path === "/login"){
        next()
    }else{
        const token = req.headers['x-acess-token'];
        jwt.verify(token, process.env.SECRET, (err, decoded) => {
            if (err) return res.status(401).send('Sem autorização');
            req.dados = decoded

            next()
        })
    }
}

module.exports = verifyJWT