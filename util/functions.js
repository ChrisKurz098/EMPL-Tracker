const DB = require('../db/connection');
const cTable = require('console.table');

module.exports = {
    viewAllDepartments() { console.log('1'); viewDeps() },
    viewAllRoles() { console.log('2') },
    viewAllEmployees() { console.log('3') },
    addADepartment() { console.log('4') },
    addARole() { console.log('5') },
    addAnEmployee() { console.log('6') },
    updateAnEmployeeRole() { console.log('7') },
    updateEmployeeManager() { console.log('8') },
    viewEmployeesByManager() { console.log('9') },
    veiwEmployeesByDepartment() { console.log('10') },
    deleteCatagoryType() { console.log('Department, Role, Employee') },
    viewDepartmentBudget() { console.log('11') }
}


function viewDeps() {
    const sql = `SELECT * FROM department`
    DB.query(sql, (err, rows) => {
        console.log(rows);
        console.table(row);

    });
    return;
}