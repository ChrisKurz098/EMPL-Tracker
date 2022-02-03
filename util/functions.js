
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
    async viewEmployeesByManager() {
        await sqlCommand.showEmployeesByManager()
    },
    /////
    async veiwEmployeesByDepartment() {
        await sqlCommand.showEmployeesByDepartment()
    },
    /////
    async viewDepartmentBudgets() {
        await sqlCommand.showDepartmentsByBudget()
    },
    /////
    async addADepartment() {
        await sqlCommand.showDepartments()
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
        await sqlCommand.showRoles();
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
        await sqlCommand.showEmployeesByManager()
        let roles = await sqlData.makeArray(`SELECT title FROM role`, 'title');
        let managers = await getFirstLastArray();
        managers.push('None');
        await userPrompts.addEmployee(roles, managers)
            .then(async ({ first, last, role, manager }) => {

                if (first !== '') {
                    const managerNameArray = manager.split(" ");
                    managerNameArray[0] = managerNameArray[0].replace(',', '');
                    let roleId = await sqlData.makeArray(`SELECT id FROM role WHERE title = '${role}'`, 'id');
                    let managerId = await sqlData.makeArray(`SELECT id FROM employee WHERE first_name = '${managerNameArray[1]}' AND last_name = '${managerNameArray[0]}'`, 'id');
                    await sqlCommand.addEmployee(first, last, roleId, managerId);


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
                employee[0] = employee[0].replace(',', '');

                let roleId = await sqlData.makeArray(`SELECT id FROM role WHERE title = '${newRole}'`, 'id');
                let employeeId = await sqlData.makeArray(`SELECT id FROM employee WHERE first_name = '${employee[1]}' AND last_name = '${employee[0]}'`, 'id');


                if (employee[0] !== 'CANCLE' && newRole[0] !== 'CANCLE') {
                    await sqlCommand.updateEmployeeRole(employeeId, roleId);

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
        employees.push('None');
        employees.push('CANCLE');
        await userPrompts.updateEmployeeManager(employees, employees)
            .then(async ({ employee, newManager }) => {

                employee = employee.split(' ');
                employee[0] = employee[0].replace(',', '');
                //if you cancled at employee name, manager will be undefined.

                //if employee returns a last name, then newManager selection was made and therefore is not undefined and can be split
                if (employee[1]) {
                    newManager = newManager.split(' ');
                    newManager[0] = newManager[0].replace(',', '');
                } else {
                    newManager = 'CANCLE';
                }



                let managerId = await sqlData.makeArray(`SELECT id FROM employee WHERE first_name = '${newManager[1]}' AND last_name = '${newManager[0]}'`, 'id');

                if (newManager[0] === 'None') {
                    managerId = 'NULL';
                }

                let employeeId = await sqlData.makeArray(`SELECT id FROM employee WHERE first_name = '${employee[1]}' AND last_name = '${employee[0]}'`, 'id');


                if (employee[0] !== 'CANCLE' && newManager[0] !== 'CANCLE') {
                    await sqlCommand.updateEmployeeManager(employeeId, managerId);

                    console.log(`\n${employee[0]} ${employee[1]}'s manager changed to ${newManager[1]} ${newManager[2]}\n`);
                } else {
                    console.log(`\ncanceled\n`);
                }
            });
    },
    /////
    async deleteCatagoryType() {
        let deps = await sqlData.makeArray(`SELECT name FROM department`, 'name');
        let roles = await sqlData.makeArray(`SELECT title FROM role`, 'title');
        let employees = await getFirstLastArray();
        deps.push('CANCLE');
        roles.push('CANCLE');
        employees.push('CANCLE');
        await sqlCommand.showEmployeesByDepartment();
        await userPrompts.deleteCatagoryType(deps, roles, employees)

            .then(async ({ catagory, delDep, delRole, delEmpl, check }) => {

                if (delDep, delRole, delEmpl !== 'CANCLE' && check == 'YES' && catagory !== 'None') {

                    if (delDep !== undefined) {
                        let depId = await sqlData.makeArray(`SELECT id FROM department WHERE name = '${delDep}'`, 'id');
                        let roleId = await sqlData.makeArray(`SELECT id FROM role WHERE department_id = '${depId}'`, 'id');
                        await sqlCommand.deleteCatagory('role', roleId);
                        await sqlCommand.deleteCatagory('department', depId);

                        console.log(`\n The department ${delDep} has been deleted!\n`)

                    }
                    if (delRole !== undefined) {
                        let roleId = await sqlData.makeArray(`SELECT id FROM role WHERE title = '${delRole}'`, 'id');
                        await sqlCommand.deleteCatagory('role', roleId);

                        console.log(`\n The role ${delRole} has been deleted!\n`)
                    }
                    if (delEmpl !== undefined) {
                        //split first and last name
                        const splitName = delEmpl.split(' ');
                        splitName[0] = splitName[0].replace(',', '');

                        let emplID = await sqlData.makeArray(`SELECT id FROM employee WHERE first_name = '${splitName[1]}' AND last_name = '${splitName[0]}'`, 'id');

                        await sqlCommand.deleteCatagory('employee', emplID);

                        console.log(`\nThe employee ${delEmpl} has been deleted!\n`)
                    }
                } else {
                    console.log('\ncancled\n');
                }
            });
    }

};

//this will take an array of first names and array of last names (in the same order) and merge the names together into a single array of first and last names
async function getFirstLastArray() {
    let first = await sqlData.makeArray(`SELECT first_name FROM employee`, 'first_name');
    let last = await sqlData.makeArray(`SELECT last_name FROM employee`, 'last_name');
    for (let i = 0; i < first.length; i++) {
        last[i] += ', ' + first[i];
    }
    last.sort()
    return last;
}



//////////////////////////////////
module.exports = runFunction;