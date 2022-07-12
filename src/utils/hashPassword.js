const bcrypt = require('bcrypt');
require('dotenv').config()
const saltRounds = parseInt(process.env.SALTROUNDS)

async function hash (senha) {
    return await bcrypt.hash(senha, saltRounds);
}

module.exports = {hash}