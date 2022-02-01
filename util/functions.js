
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
                    console.clear();
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
                    console.clear();
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
                    console.clear();
                    console.log(`\n${first} ${last} added to employee list\n`);
                } else {
                    console.log(`\ncanceled\n`);
                }
            });
    },
    /////
    async updateAnEmployeeRole() {
        let roles = await sqlData.makeArray(`SELECT title FROM role`, 'title');
        let employees = await sqlData.makeArray(`SELECT first_name FROM employee`, 'first_name');
        employees.push('CANCLE');
        roles.push('CANCLE');
        await userPrompts.updateEmployeeRole(employees, roles )
            .then(async ({ employee, newRole}) => {
                
                let roleId = await sqlData.makeArray(`SELECT id FROM role WHERE title = '${newRole}'`, 'id');
                let employeeId = await sqlData.makeArray(`SELECT id FROM employee WHERE first_name = '${employee}'`, 'id');
                

                if (employee !== 'CANCLE' && newRole !== 'CANCLE') {
                    await sqlCommand.updateEmployeeRole(employeeId, roleId);
                    console.clear();
                    console.log(`\n${employee}'s role changed to ${newRole}\n`);
                } else {
                    console.log(`\ncanceled\n`);
                }
            });
    },
    /////
    async updateEmployeeManager() {
        console.log('\nUpdating Manager not yet implemented\n');
    },
    /////
    async viewEmployeesByManager() {
        console.log('\nView by manager not yet implemented\n');
    },
    /////
    async veiwEmployeesByDepartment() {
        console.log('\nView by department not yet implemented\n');
    },
    /////
    async deleteCatagoryType() {
        console.log('\nRemoving departments not yet implemented\n');
    },
    /////
    async viewDepartmentBudget() {
        console.log('\nView y budget not yet implemented\n');
    }
};




//////////////////////////////////
module.exports = runFunction;