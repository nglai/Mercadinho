const mysql = require('mysql2');

const pool = mysql.createPool({
    host: 'localhost',
    user: 'admin',
    password: 'admin',
    database: 'mercadinho'
});

const promisePool = pool.promise();

// SELECT
async function select(nomeTabela) {
    //abstração de array [posição]
    const [data] = await promisePool.query(`select * from ${nomeTabela}`);
    return data
}

//SELECT BY ID
async function selectById(nomeTabela, idName, id) {
    try {
        //abstração de array [posição]
        const [data] = await promisePool.query(`SELECT * FROM ${nomeTabela} WHERE ${idName}=${id}`);
        return data;
    } catch (error) {
        console.log(error)
    }
}

// INSERT
async function insert(nomeTabela, colunas, valores) {
    try {
        const valor = '"' + valores.join('","') + '"'
        await promisePool.query(`INSERT INTO ${nomeTabela} (${colunas}) VALUES (${valor})`)
        console.log('Inserido com sucesso!')
    } catch (error) {
        console.log(error)
    }
}

// UPDATE
async function update(nomeTabela, colunas, valores, idName, id) {
    try {
        let update = '';
        for (let i = 0; i < colunas.length; i++) {
            if(i == (colunas.length - 1)){
                update += colunas[i] + '=' + `"${valores[i]}"`
            } else {
                update += colunas[i] + '=' + `"${valores[i]}"` + ","
            }
        }
        await promisePool.query(`UPDATE ${nomeTabela} SET ${update} WHERE ${idName}=${id} `)
        console.log('Atualizado com sucesso!')
    } catch (error) {
        console.log(error)
    }
}

//delete
async function deletar(nomeTabela, idName, id) {
    try {
        await promisePool.query(`DELETE FROM ${nomeTabela} WHERE ${idName}=${id} `)
        console.log('Deletado com sucesso!')
    } catch (error) {
        console.log(error)
    }
}


pool.getConnection((err) => {
    if (err) {
        console.log('Error connecting to DB', err)
        return
    }
    console.log('Connection established')
})

module.exports = { select, selectById, insert, update, deletar }