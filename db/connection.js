const mySql = require('mysql2');

const DB = mySql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '(Bd2%)~5-k',
    database: 'employees'
},
console.clear(),
    console.log(`Successfully loaded database ...`)
)


module.exports = DB;