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

//test connection and end program if there is an error
DB.promise().query('select * from role')
.then(([rows, feilds]) => {
    //do nothing if no error
}).catch(err => {
    console.log(`\n`,err,`\n !!!Please make sure that .env is properly configured!!!`)
    process.exit();
});

module.exports = DB;