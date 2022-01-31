const mySql = require('mysql2');

const DB = mySql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '(Bd2%)~5-k',
    database: 'employees'
},
    console.log('Connected to the election database.')
);


module.exports = DB;