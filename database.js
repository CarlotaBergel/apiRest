const mysql = require("mysql2");

const pool = mysql.createPool(
    {
        host                :"localhost",
        user                :"root",
        password            :"admin",
        database            :"appbooks",
        waitForConnections  :true,
        connectionLimit     :10,
        masIdle             :10,
        idleTimeout         :60000,
        queueLimit          :0
    }).promise();

console.log("conexión con la BBDD Creada");

module.exports = {pool};