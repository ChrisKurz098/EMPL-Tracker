
const userPrompts = require('../util/prompts');
const { sqlCommand, sqlData } = require('./sqlCommands');



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
        let list = await sqlData.makeArray(`SELECT name FROM department`, 'name')


        await userPrompts.addRole(list)
            .then(async ({ newTitle, newSalary, depName }) => {

                let depID = await sqlData.makeArray(`SELECT id FROM department WHERE name = '${depName}'`, 'id');
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
        let roles = await sqlData.makeArray(`SELECT title FROM role`, 'title');
        let managers = await sqlData.makeArray(`SELECT first_name FROM employee`, 'first_name');
        managers.push('None');
        await userPrompts.addEmployee(roles, managers)
            .then(async ({ first, last, role, manager }) => {

                let roleId = await sqlData.makeArray(`SELECT id FROM role WHERE title = '${role}'`, 'id');
                let managerId = await sqlData.makeArray(`SELECT id FROM employee WHERE first_name = '${manager}'`, 'id');
                

                if (first !== '') {
                    await sqlCommand.addEmployee(first, last, roleId, managerId);
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