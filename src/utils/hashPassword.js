const bcrypt = require('bcrypt');
require('dotenv').config()
// const saltRounds = process.env.SALTROUNDS
const saltRounds = 10

async function hash (senha) {
    return await bcrypt.hash(senha, saltRounds);
}

module.exports = {hash}