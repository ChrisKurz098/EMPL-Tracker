const mySql = require('mysql2');
require('dotenv').config();
const DB = mySql.createConnection({
    host: 'localhost',
    user: process.env.DB_USER,
    password: process.env.DB_PW,
    database: 'employees'
},
console.clear(),
    console.log(`Successfully loaded database ...`)
)


module.exports = DB;