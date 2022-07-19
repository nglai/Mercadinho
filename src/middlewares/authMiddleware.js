const jwt = require("jsonwebtoken");
require('dotenv').config()

function verifyJWT(req, res, next) {
    if(req.path === "/login"){
        next()
    }else{
        const authHeaders = req.headers.authorization;

        if (!authHeaders) {
            return response.status(401).json({ error: "Sem tokem" });
        }

        const [, token] = authHeaders.split(" ");
        
        jwt.verify(token, process.env.SECRET, (err, decoded) => {
            if (err) return res.status(401).send('Sem autorização');
            req.dados = decoded

            next()
        })
    }
}

module.exports = verifyJWT