
const inquirer = require('inquirer');


module.exports = {
    async mainPrompt() {
        return inquirer.prompt([{
            type: 'list',
            name: 'answer',
            message: 'Please Select an Option: ',
            pageSize: '7',
            loop: false,
            choices: [new inquirer.Separator('===========MAIN MENU==========='),
            new inquirer.Separator('-------------------------------'),
            new inquirer.Separator('         -Veiw Tables-'),
            new inquirer.Separator('-------------------------------'),
                'View All Departments',
                'View All Roles',
                'View All Employees',
                'View Employees By Manager',
                'Veiw Employees By Department',
                'View Department Budgets',
            new inquirer.Separator('-------------------------------'),
            new inquirer.Separator('           -Add Data-'),
            new inquirer.Separator('-------------------------------'),
                'Add A Department',
                'Add A Role',
                'Add An Employee',
            new inquirer.Separator('-------------------------------'),
            new inquirer.Separator('         -Update Data-'),
            new inquirer.Separator('-------------------------------'),
                'Update An Employee Role',
                'Update Employee Manager',
                'Delete Catagory Type',
            new inquirer.Separator('-------------------------------'),
                'Quit',
            new inquirer.Separator('-------------------------------'),]
        }]);
    },

    async addDepartment() {
        return inquirer.prompt([{
            type: 'input',
            name: 'newDepName',
            message: "Enter the name of the new Department (leave blank to cancle): "
        }]);
    },
    async addRole(list) {


        await console.log('Departments: ', list);
        return inquirer.prompt([
            {
                type: 'input',
                name: 'newTitle',
                message: "Enter the name of the new role (leave blank to cancle): "
            },
            {
                type: 'input',
                name: 'newSalary',
                message: "Enter a salary for this role: ",
                when: (answers) => {
                    if (answers.newTitle === '') { return false } else { return true }
                }
            },
            {
                type: 'list',
                name: 'depName',
                message: "Select the associated department: ",
                choices: list,
                when: (answers) => {
                    if (answers.newTitle === '') { return false } else { return true }
                }
            }
        ]);
    },
    async addEmployee(roles,managers) {
        return inquirer.prompt([
            {
                type: 'input',
                name: 'first',
                message: "Enter employees first name (leave blank to cancle): ",
                validate: (answer) => {if (answer.split(" ")[1])  {       ///checks if there are any spaces
                    console.log('\nOnly one name can be entered. No spaces please.');
                    return false
                } else {
                    return true}}
            },
            {
                type: 'input',
                name: 'last',
                message: "Enter employees last name: ",
                validate: (answer) => {if (answer.split(" ")[1]) { ///checks if there are any spaces
                    console.log('\nOnly one name can be entered. No spaces please.');
                    return false
                } else {
                    return true}},
                when: (answers) => {
                    if (answers.first === '') { return false } else { return true }
                }
            },
            {
                type: 'list',
                name: 'role',
                message: "Select employee role: ",
                choices: roles,
                when: (answers) => {
                    if (answers.first === '') { return false } else { return true }
                }
            },
            {
                type: 'list',
                name: 'manager',
                message: "Select employees manager: ",
                choices: managers,
                when: (answers) => {
                    if (answers.first === '') { return false } else { return true }
                }
            }
        ]);
    },
    async updateEmployeeRole(employees,roles){
     return inquirer
        .prompt([
            {
                type: 'list',
                name: 'employee',
                message: 'Select the employee to change roles',
                choices: employees
            },
            {
                type: 'list',
                name: 'newRole',
                message: 'Please select a new role:',
                choices: roles,
                when: (answers) => {
                    if (answers.employee === 'CANCLE') { return false } else { return true }
                }
            }
        ]);
    },
    async updateEmployeeManager(employees,managers){
        return inquirer
           .prompt([
               {
                   type: 'list',
                   name: 'employee',
                   message: 'Select the employee to change manager',
                   loop: false,
                   choices: employees
               },
               {
                   type: 'list',
                   name: 'newManager',
                   message: 'Please select a new manager:',
                   loop: false,
                   choices: managers,
                   when: (answers) => {
                       if (answers.employee === 'CANCLE') { return false } else { return true }
                   }
               }
           ]);
       },
    async deleteCatagoryType(deps,roles,employees){
        return inquirer
           .prompt([
               {
                   type: 'list',
                   name: 'catagory',
                   message: 'What type of catagory do you wnat to delete?',
                   choices: ['Department', 'Role', 'Employee', 'None']
               },
               {
                type: 'list',
                name: 'delDep',
                message: 'Select a department to delete',
                choices: deps,
                when: (answers) => answers.catagory === 'Department',
               },
               {
                type: 'list',
                name: 'delRole',
                message: 'Select a role to delete',
                choices: roles,
                when: (answers) => answers.catagory === 'Role'
               },
               {
                type: 'list',
                name: 'delEmpl',
                message: 'Select an employee to delete',
                choices: employees,
                when: (answers) => answers.catagory === 'Employee'
               },
               {
                type: 'list',
                name: 'check',
                message: 'WARNING: Are you sure? This will delete this entry forever!!!',
                choices: ['YES', 'NO'],
                when: (answers) => {if (answers.catagory !== 'None' && answers.delDep !=='CANCLE' && answers.delRole !=='CANCLE' && answers.delEmpl !=='CANCLE')  {return true} }
               }
           ])
        }
}