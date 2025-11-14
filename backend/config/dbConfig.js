const mysql = require('mysql2')

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'manager',
    database: 'movies_db'
})

module.exports = pool