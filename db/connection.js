const mySql = require('mysql2');

const DB = mySql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '(Bd2%)~5-k',
    database: 'employees'
});

module.exports = DB;