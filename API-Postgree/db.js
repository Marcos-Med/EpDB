const mysql = require('mysql2');

const db = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: 'Madeb20!',
    database: 'hotelaria'
});

db.connect((err) => {
    if(err){
        console.error("Erro ao conectar com o banco de dados:", err);
        return;
    }
    console.log("Conectado com sucesso");
});

module.exports = db;