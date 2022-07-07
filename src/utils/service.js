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
async function selectById(nomeTabela, id) {
    try {
        //abstração de array [posição]
        const [data] = await promisePool.query(`SELECT * FROM ${nomeTabela} WHERE ID=${id}`);
        return data;
    } catch (error) {
        console.log(error)
    }
}

// INSERT
// async function insert(nomeTabela, colunas, valores) {
//     try {
//         const valor = '"' + valores.join('","') + '"'
//         await promisePool.query(`INSERT INTO ${nomeTabela} (${colunas}) VALUES (${valor})`)
//         console.log('Inserido com sucesso!')
//     } catch (error) {
//         console.log(error)
//     }
// }
async function insert(nomeTabela, colunas, valores) {
    try {
        //Colunas [ 'NAME', 'ID' ]
        //Valores [ { NAME: 'Chave 1', ID: 4 }, { NAME: 'Chave 2', ID: 5 } ]

        const values = []  //[ [ 'Chave 1', 4 ], [ 'Chave 2', 5 ] ]

        for (let index = 0; index < valores.length; index++) {
            let valor  = Object.values(valores[index])
            const valor2 = '("' + valor.join('","') + '")'
            values.push(valor2)
        }
        
        await promisePool.query(`INSERT INTO ${nomeTabela} (${colunas}) VALUES ${values}`)
        console.log('Inserido com sucesso!')
    } catch (error) {
        console.log(error)
    }
}

// UPDATE
async function update(nomeTabela, colunas, valores, id) {
    try {
        let update = '';
        for (let i = 0; i < colunas.length; i++) {
            if(i == (colunas.length - 1)){
                update += colunas[i] + '=' + `"${valores[i]}"`
            } else {
                update += colunas[i] + '=' + `"${valores[i]}"` + ","
            }
        }
        await promisePool.query(`UPDATE ${nomeTabela} SET ${update} WHERE ID=${id} `)
        console.log('Atualizado com sucesso!')
    } catch (error) {
        console.log(error)
    }
}

// DELETE
async function deletar(nomeTabela, id) {
    try {
        await promisePool.query(`DELETE FROM ${nomeTabela} WHERE ID=${id} `)
        console.log('Deletado com sucesso!')
    } catch (error) {
        console.log(error)
    }
}

module.exports = { select, selectById, insert, update, deletar }