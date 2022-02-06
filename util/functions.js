
const userPrompts = require('../util/prompts');

//sqlCommand holds oll the functions for displaying all types of tables
//sqlData was going to hold more functions, but only holds a function (makeArray(sqlResonse, keyToFilterOut)) for converthing an sql response into an array of data. 
//Limited to making an array from one object key
const { sqlCommand, sqlData } = require('./sqlCommands');

// the associated function(s) and code for each selection of the main menu
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
        const answer = await userPrompts.chooseOrder();
        switch (answer.order) {
            case 'id':
            case 'last_name':
                await sqlCommand.showEmployees(answer.order);
                break;
            case 'manager':
                await sqlCommand.showEmployeesByManager();
                break;
            case 'department':
                await sqlCommand.showEmployeesByDepartment();
                break;
        }
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
        //display table(s) that may be needed for this input
        await sqlCommand.showDepartments();
        //run the prompt for adding a department
        await userPrompts.addDepartment()
            .then(async ({ newDepName }) => {
                //if newDepName is not empty add the department, otherwise cancle
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
        //display table(s) that may be needed for this input
        await sqlCommand.showRoles();
        //get a list of department names 
        let list = await sqlData.makeArray(`SELECT name FROM department`, 'name')

        //run prompt for adding a role and pass the list of department names to display in the prompt as choices
        await userPrompts.addRole(list)
            .then(async ({ newTitle, newSalary, depName }) => {

                //get the department ID based off the  department name returned from the prompt
                let depID = await sqlData.makeArray(`SELECT id FROM department WHERE name = '${depName}'`, 'id');
                //if left prompt left blank, cancle
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
        //display table(s) that may be needed for this input
        await sqlCommand.showEmployeesByManager()
        //get a list of all roles
        let roles = await sqlData.makeArray(`SELECT title FROM role`, 'title');
        //get list of all employees
        let managers = await getFirstLastArray();
        //add the option 'None' to the list of names. Used when list is passed to prompt for choices
        managers.push('None');

        //run prompt
        await userPrompts.addEmployee(roles, managers)
            .then(async ({ first, last, role, manager }) => {
                //if name left blank, cancle
                if (first !== '') {
                    //splits the manager string 'last_name, first_name' to seperate names
                    const managerNameArray = manager.split(" ");
                    //removes the comma from the last name
                    managerNameArray[0] = managerNameArray[0].replace(',', '');
                    //get role id and employee id from retruned names
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
        //display table(s) that may be needed for this input
        await sqlCommand.showEmployees('last_name');
        //get an array of all roles
        let roles = await sqlData.makeArray(`SELECT title FROM role`, 'title');


        //get the array of combined first and last bnames
        let employees = await getFirstLastArray();

        //add cancle to the arrays as prompt choices
        employees.push('CANCLE');
        roles.push('CANCLE');
        await userPrompts.updateEmployeeRole(employees, roles)
            .then(async ({ employee, newRole }) => {

                //parse out the first and last names of response and remove the comma
                employee = employee.split(' ');
                employee[0] = employee[0].replace(',', '');

                //get needed ID's by name
                let roleId = await sqlData.makeArray(`SELECT id FROM role WHERE title = '${newRole}'`, 'id');
                let employeeId = await sqlData.makeArray(`SELECT id FROM employee WHERE first_name = '${employee[1]}' AND last_name = '${employee[0]}'`, 'id');

                //if CANCLE wasnt selected, update database
                if (employee[0] !== 'CANCLE' && newRole[0] !== 'CANCLE') {
                    await sqlCommand.updateEmployeeRole(employeeId, roleId);

                    console.log(`\n${employee[1]} ${employee[0]}'s role changed to ${newRole}\n`);
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


                //get needed ID's by name
                let managerId = await sqlData.makeArray(`SELECT id FROM employee WHERE first_name = '${newManager[1]}' AND last_name = '${newManager[0]}'`, 'id');

                //if employee has no manager, send 'Null' to sql commans. The sqlCommand function will check if this is "NULL" and will run the required code
                if (newManager[0] === 'None') {
                    managerId = 'NULL';
                }
                let employeeId = await sqlData.makeArray(`SELECT id FROM employee WHERE first_name = '${employee[1]}' AND last_name = '${employee[0]}'`, 'id');


                if (employee[0] !== 'CANCLE' && newManager[0] !== 'CANCLE') {
                    await sqlCommand.updateEmployeeManager(employeeId, managerId);

                    console.log(`\n${employee[1]} ${employee[0]}'s manager changed to ${newManager[1]} ${newManager[0]}\n`);
                } else {
                    console.log(`\ncanceled\n`);
                }
            });
    },
    /////
    async deleteCatagoryType() {
        //get array of each catagory
        let deps = await sqlData.makeArray(`SELECT name FROM department`, 'name');
        let roles = await sqlData.makeArray(`SELECT title FROM role`, 'title');
        let employees = await getFirstLastArray();
        //add cancle to selection for prompt choice
        deps.push('CANCLE');
        roles.push('CANCLE');
        employees.push('CANCLE');
        //display table(s) that may be needed for this input
        await sqlCommand.showEmployeesByDepartment();
        await userPrompts.deleteCatagoryType(deps, roles, employees)

            .then(async ({ catagory, delDep, delRole, delEmpl, check }) => {
                //if nothing was cancled and the user confirmed that they wanted to delete the selected entry, run deletion
                if (delDep, delRole, delEmpl !== 'CANCLE' && check == 'YES' && catagory !== 'None') {
                    //all returned del* variables will be undefined except the one selected by the user
                    if (delDep !== undefined) {
                        //get ID's from names
                        let depId = await sqlData.makeArray(`SELECT id FROM department WHERE name = '${delDep}'`, 'id');
                        let roleId = await sqlData.makeArray(`SELECT id FROM role WHERE department_id = '${depId}'`, 'id');
                        await sqlCommand.deleteCatagory('role', roleId);
                        await sqlCommand.deleteCatagory('department', depId);

                        console.log(`\n The department ${delDep} has been deleted!\n`)

                    }

                    if (delRole !== undefined) {
                        //get id from name
                        let roleId = await sqlData.makeArray(`SELECT id FROM role WHERE title = '${delRole}'`, 'id');
                        await sqlCommand.deleteCatagory('role', roleId);

                        console.log(`\n The role ${delRole} has been deleted!\n`)
                    }

                    if (delEmpl !== undefined) {
                        //split first and last name and remove comma
                        const splitName = delEmpl.split(' ');
                        splitName[0] = splitName[0].replace(',', '');
                        //get ID by first and last name
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
    //gets th two arrays of names
    let first = await sqlData.makeArray(`SELECT first_name FROM employee`, 'first_name');
    let last = await sqlData.makeArray(`SELECT last_name FROM employee`, 'last_name');
    //for each element in 'last' add the value of 'first' of the same index
    for (let i = 0; i < last.length; i++) {
        last[i] += ', ' + first[i];
    }
    //names are displayed last, first. sort by last name
    last.sort()
    //return updated list
    return last;
}



//////////////////////////////////
module.exports = runFunction;