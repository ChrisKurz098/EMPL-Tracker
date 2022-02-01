
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
        
 
        //get the array of combined first and last bnames
        let employees = await getFirstLastArray();
        
        employees.push('CANCLE');
        roles.push('CANCLE');
        await userPrompts.updateEmployeeRole(employees, roles)
            .then(async ({ employee, newRole }) => {

                employee = employee.split(' ');
            
                let roleId = await sqlData.makeArray(`SELECT id FROM role WHERE title = '${newRole}'`, 'id');
                let employeeId = await sqlData.makeArray(`SELECT id FROM employee WHERE first_name = '${employee[0]}' AND last_name = '${employee[1]}'`, 'id');


                if (employee[0] !== 'CANCLE' && newRole[0] !== 'CANCLE') {
                    await sqlCommand.updateEmployeeRole(employeeId, roleId);
                    console.clear();
                    console.log(`\n${employee[0]} ${employee[1]}'s role changed to ${newRole}\n`);
                } else {
                    console.log(`\ncanceled\n`);
                }
            });
    },
    /////
    async updateEmployeeManager() {
        await sqlCommand.showEmployeesByManager();

        //get the array of combined first and last bnames
        let employees = await getFirstLastArray();
        
        employees.push('CANCLE');
        await userPrompts.updateEmployeeManager(employees, employees)
            .then(async ({ employee, newManager }) => {
                
                employee = employee.split(' ');
                //if you cancled at employee name, manager will be undefined.
                //if employee returns a last name, then newManager selection was made and therefore is not undefined and can be split
                (employee[1]) ? newManager = newManager.split(' ') : newManager = 'CANCLE';

                let managerId = await sqlData.makeArray(`SELECT id FROM employee WHERE first_name = '${newManager[0]}' AND last_name = '${newManager[1]}'`, 'id');
                let employeeId = await sqlData.makeArray(`SELECT id FROM employee WHERE first_name = '${employee[0]}' AND last_name = '${employee[1]}'`, 'id');


                if (employee[0] !== 'CANCLE' && newManager[0] !== 'CANCLE') {
                    await sqlCommand.updateEmployeeManager(employeeId, managerId);
                    console.clear();
                    console.log(`\n${employee[0]} ${employee[0]}'s manager changed to ${newManager[0]} ${newManager[1]}\n`);
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
        let employees = await getFirstLastArray();
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
                        console.log(`\n The department ${delDep} has been deleted!\n`)
                       
                    }
                    if (delRole !== 'CANCLE') {
                        let roleId = await sqlData.makeArray(`SELECT id FROM role WHERE title = '${delRole}'`, 'id');
                        await sqlCommand.deleteCatagory('role', roleId);
                        console.clear();
                        console.log(`\n The role ${delRole} has been deleted!\n`)
                    }
                    if (delEmpl !== 'CANCLE') {
                        //split first and last name
                        const splitName = delEmpl.split(' ');
                        
                        let emplID = await sqlData.makeArray(`SELECT id FROM employee WHERE first_name = '${splitName[0]}' AND last_name = '${splitName[1]}'`, 'id');
                        console.log(emplID);
                        await sqlCommand.deleteCatagory('employee', emplID);
                         console.clear();
                         console.log(`\nThe employee ${delEmpl} has been deleted!\n`)
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

//this will take an array of first names and array of last names (in order) and merge the names together
async function getFirstLastArray(){
    let first = await sqlData.makeArray(`SELECT first_name FROM employee`, 'first_name');
    let last = await sqlData.makeArray(`SELECT last_name FROM employee`, 'last_name');
    for (let i = 0; i < first.length; i++) {
        const e = last[i];
        first[i] += ' ' + e;
    }
    return first;
}



//////////////////////////////////
module.exports = runFunction;