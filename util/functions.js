
const userPrompts = require('../util/prompts');
const sqlCommand = require('./sqlCommands');



const runFunction = {
    async viewAllDepartments() {
        await sqlCommand.showDepartments()
    },
    /////
    async viewAllRoles() {
        await sqlCommand.showRoles();
    },
    /////
    async viewAllEmployees() {
        await sqlCommand.showEmployees();
    },
    /////
    async addADepartment() {
        await userPrompts.addDepartment()
            .then(async ({ newDepName }) => {
                if (newDepName !== '') {
                   await sqlCommand.addDepartment(newDepName);
                    console.log(`\n${newDepName} added to department list \n`);
                } else {
                    console.log(`\ncanceled\n`);
                }
            });

    },
    /////
    async addARole() {
        await userPrompts.addRole()
            .then(async ({ newTitle, newSalary, depID }) => {
                if (newTitle !== '') {
                    await sqlCommand.addRole(newTitle, newSalary, depID);
                    console.log(`\n${newTitle} added to roles list\n`);
                } else {
                    console.log(`\ncanceled\n`);
                }
            });
    },
    /////
    async addAnEmployee() {
        await userPrompts.addEmployee()
            .then(async ({ first, last, role, manager }) => {
                if (first !== '') {
                   await sqlCommand.addEmployee(first, last, role, manager);
                    console.log(`\n${first} ${last} added to employee list\n`);
                } else {
                    console.log(`\ncanceled\n`);
                }
            });
    },
    /////
    async updateAnEmployeeRole() {
        console.log('7');
    },
    /////
    async updateEmployeeManager() {
        console.log('8');
    },
    /////
    async viewEmployeesByManager() {
        console.log('9');
    },
    /////
    async veiwEmployeesByDepartment() {
        console.log('10');
    },
    /////
    async deleteCatagoryType() {
        console.log('Department, Role, Employee');
    },
    /////
    async viewDepartmentBudget() {
        console.log('11')
    }
};




//////////////////////////////////
module.exports = runFunction;