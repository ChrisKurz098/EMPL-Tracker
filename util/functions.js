
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
        await sqlCommand.showEmployees();
        let roles = await sqlData.makeArray(`SELECT title FROM role`, 'title');
        let employees = await sqlData.makeArray(`SELECT first_name FROM employee`, 'first_name');
        employees.push('CANCLE');
        roles.push('CANCLE');
        await userPrompts.updateEmployeeRole(employees, roles)
            .then(async ({ employee, newRole }) => {

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
        await sqlCommand.showEmployees();
        // let manIDs = await sqlData.makeArray(`SELECT manager_id FROM employee GROUP BY manager_id`, 'manager_id');
        // //remove null values
        // manIDs.shift();
        // //convert array into useable string for SQL query

        // let managerIdString = ``;
        // manIDs.forEach((e, i) => {
        //     managerIdString += `id = ${e} `;
        //     (i < manIDs.length - 1) ? managerIdString += `OR ` : managerIdString += ` `;
        // });

        
        // let managerNames = await sqlData.makeArray(`SELECT first_name FROM employee WHERE ${managerIdString}`, 'first_name')

        let employees = await sqlData.makeArray(`SELECT first_name FROM employee`, 'first_name');
        // managerNames.push('CANCLE');
        employees.push('CANCLE');
        await userPrompts.updateEmployeeManager(employees, employees)
            .then(async ({ employee, newManager }) => {

                let managerId = await sqlData.makeArray(`SELECT id FROM employee WHERE first_name = '${newManager}'`, 'id');
                let employeeId = await sqlData.makeArray(`SELECT id FROM employee WHERE first_name = '${employee}'`, 'id');


                if (employee !== 'CANCLE' && newManager !== 'CANCLE') {
                    await sqlCommand.updateEmployeeManager(employeeId, managerId);
                    console.clear();
                    console.log(`\n${employee}'s manager changed to ${managerId}\n`);
                } else {
                    console.log(`\ncanceled\n`);
                }
            });
    },
    /////
    async viewEmployeesByManager() {
        await sqlCommand.showEmployeesByManager()
    },
    /////
    async veiwEmployeesByDepartment() {
        await sqlCommand.showEmployeesByDepartment()
    },
    /////
    async deleteCatagoryType() {
        let deps = await sqlData.makeArray(`SELECT name FROM department`, 'name');
        let roles = await sqlData.makeArray(`SELECT title FROM role`, 'title');
        let employees = await sqlData.makeArray(`SELECT first_name FROM employee`, 'first_name');
        deps.push('CANCLE');
        roles.push('CANCLE');
        employees.push('CANCLE');
        console.log('All Departments: ', deps);
        await sqlCommand.showEmployeesByDepartment();
        await userPrompts.deleteCatagoryType(deps, roles, employees)
            .then(async ({catagory,delDep,delRole,delEmpl,check }) => {
                
                if (delDep !== 'CANCLE' && delRole !== 'CANCLE' && delEmpl !== 'CANCLE' && check !== 'NO' && catagory !== 'None') {
                    if (delDep !== 'CANCLE') {
                        let depId = await sqlData.makeArray(`SELECT id FROM department WHERE name = '${delDep}'`, 'id');
                        let roleId = await sqlData.makeArray(`SELECT id FROM role WHERE department_id = '${depId}'`, 'id');
                        await sqlCommand.deleteCatagory('role', roleId);
                        await sqlCommand.deleteCatagory('department', depId);
                        console.clear();
                       
                    }
                    if (delRole !== 'CANCLE') {
                        let roleId = await sqlData.makeArray(`SELECT id FROM role WHERE title = '${delRole}'`, 'id');
                        await sqlCommand.deleteCatagory('role', roleId);
                        console.clear();
                    }
                    if (delEmpl !== 'CANCLE') {
                        let emplID = await sqlData.makeArray(`SELECT id FROM employee WHERE first_name = '${delEmpl}'`, 'id');
                        await sqlCommand.deleteCatagory('employee', emplID);
                        console.clear();
                    }
                } else {
                    console.log('\ncancled\n');
                }
            });
    },
    /////
    async viewDepartmentBudgets() {
        await sqlCommand.showDepartmentsByBudget()
    }
};




//////////////////////////////////
module.exports = runFunction;