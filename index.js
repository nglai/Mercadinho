const express = require('express')
const mysql = require('mysql2');

const app = express()


//Os pools de conexão ajudam a reduzir o tempo gasto de conexão ao servidor MySQL reutilizando uma conexão anterior, deixando-as abertas em vez de fechar quando você terminar com eles.
const pool = mysql.createPool({
    host: 'localhost',
    user: 'admin',
    password: 'admin',
    database: 'mercadinho'
});


// app.get('/profiles', (req, res) => {
//     pool.getConnection(function (error, connection){
//         connection.query('select * from profiles', function (err, results, fields){
//             res.send(results)
//         });
//     });
// });

pool.getConnection((err) => {
    if (err) {
        console.log('Error connecting to DB', err)
        return
    }
    console.log('Connection established')
})

app.listen(4040, () => { console.log('Servidor rodando') })