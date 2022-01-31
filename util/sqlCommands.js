const DB = require('../db/connection');


const sqlCommand = {
    async showDepartments() {

        return makeTable(`SELECT * FROM department`).then(([rows, feilds]) => {
            console.table(rows);

        });
    },
    async showRoles() {
        return makeTable(`SELECT role.title, role.salary, department.name AS department_name
         FROM role
         LEFT JOIN department ON role.department_id = department.id
         `).then(([rows, feilds]) => {
            console.table(rows);
        });

    },
    async showEmployees() {
        return makeTable(`SELECT employee.*, role.title AS role 
        FROM employee
        LEFT JOIN role ON employee.role_id = role.id
        `).then(([rows, feilds]) => {
            console.table(rows);
        });

    },
    addDepartment(newDep) {
        makeTable(`INSERT INTO department (name)
        VALUES
        ('${newDep}')`);
    },
    addRole(newName, newSalary, depID) {
        makeTable(`INSERT INTO role (title, salary, department_id)
        VALUES
        ('${newTitle}','${newSalary}', '${depID}')`);
    },
    addEmployee(first, last, role, manager) {
        makeTable(`INSERT INTO employee (first_name, last_name,role_id,manager_id)
        VALUES
        ('${first}','${last}','${role}','${manager}')`);
    },
    updateEmployeeManager(emplID, mangID) {
        makeTable(`UPDATE employee SET manager_id = '${mangID}' WHERE id = '${emplID}'`)
    }
};


function makeTable(sql) {

    return DB.promise().query(sql)

};


module.exports = sqlCommand;