
const displayTable = require('./displayTable');
const addData = require('./addData');


const runFunction = {
    viewAllDepartments() {
 
       displayTable.departments();

    },
    /////
    viewAllRoles() {
        // displayTable.roles();
    },
    /////
    viewAllEmployees() {
        // displayTable.employee();
    },
    /////
    addADepartment() {
        console.log('4');
    },
    /////
    addARole() {
        console.log('5');
    },
    /////
    addAnEmployee() {
        console.log('6');
    },
    /////
    updateAnEmployeeRole() {
        console.log('7');
    },
    /////
    updateEmployeeManager() {
        console.log('8');
    },
    /////
    viewEmployeesByManager() {
        console.log('9');
    },
    /////
    veiwEmployeesByDepartment() {
        console.log('10');
    },
    /////
    deleteCatagoryType() {
        console.log('Department, Role, Employee');
    },
    /////
    viewDepartmentBudget() {
        console.log('11')
    }
};


module.exports = runFunction;