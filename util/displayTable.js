 const DB = require('../db/connection');

const displayTable = {
    departments() {
        const sql = `SELECT * FROM department`;
        console.log(sql);
        // DB.promise().query(sql)
        // .then(([rows,feilds]) => {
        //     console.table(rows);
        // })  .catch(console.log('err'));
        
            
        
    

        // DB.promise().query(sql, (err, rows) => {
        //     if (err) {
        //         console.log(`ERROR: `, err);
        //         return;
        //     }
        //     console.table(rows);
        
        // });

    },
    roles() {
        // const sql = `SELECT role.title, role.salary, department.name AS department_name
        //  FROM role
        //  LEFT JOIN department ON role.department_id = department.id
        //  `;

        // DB.query(sql, (err, rows) => {
        //     if (err) {
        //         console.log(`ERROR: `, err);
        //         return;
        //     }
        //     console.table(rows);
        //     return;
        // });

    },
    employee() {
        // const sql = `SELECT employee.*, role.title AS role 
        // FROM employee
        // LEFT JOIN role ON employee.role_id = role.id
        // `;

        // DB.query(sql, (err, rows) => {
        //     if (err) {
        //         console.log(`ERROR: `, err);
        //         return;
        //     }
        //     console.table(rows);
        //     return;
        // });

    }
};


module.exports =displayTable;