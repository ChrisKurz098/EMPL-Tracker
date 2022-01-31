const DB = require('../db/connection');


const sqlCommand = {
    async showDepartments() {

        return makeTable(`SELECT * FROM department`);
    
    },
    async showRoles() {
        return makeTable(`SELECT role.title, role.salary, department.name AS department_name
         FROM role
         LEFT JOIN department ON role.department_id = department.id
         `);

    },
    async showEmployees() {
        return makeTable(`SELECT employee.*, role.title AS role 
        FROM employee
        LEFT JOIN role ON employee.role_id = role.id
        `);
    },
    async addDepartment(newDep) {
        return makeTable(`INSERT INTO department (name)
        VALUES
        ('${newDep}')`);
    },
    async addRole(newTitle, newSalary, depID) {
        return makeTable(`INSERT INTO role (title, salary, department_id)
        VALUES
        ('${newTitle}','${newSalary}', '${depID}')`);
    },
    async addEmployee(first, last, role, manager) {
        return makeTable(`INSERT INTO employee (first_name, last_name,role_id,manager_id)
        VALUES
        ('${first}','${last}','${role}','${manager}')`);
    },
    updateEmployeeManager(emplID, mangID) {
        makeTable(`UPDATE employee SET manager_id = '${mangID}' WHERE id = '${emplID}'`)
    }
};


function makeTable(sql) {

    return DB.promise().query(sql)
    .then(([rows, feilds]) => {
        console.table(rows);
    }).catch(console.log);

};


module.exports = sqlCommand;