
const inquirer = require('inquirer');

module.exports = {
    async mainPrompt() {
        return inquirer.prompt([{
            type: 'list',
            name: 'answer',
            message: 'Please Select an Option: ',
            pageSize: '8',
            choices: [new inquirer.Separator('===========MAIN MENU==========='),
            new inquirer.Separator('-------------------------------'),
            new inquirer.Separator('         -Veiw Tables-'),
            new inquirer.Separator('-------------------------------'),
                'View All Departments',
                'View All Roles',
                'View All Employees',
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
            new inquirer.Separator('-------------------------------'),
            new inquirer.Separator('     -Veiw Ordered Tables-'),
            new inquirer.Separator('-------------------------------'),
                'View Employees By Manager',
                'Veiw Employees By Department',
            new inquirer.Separator('-------------------------------'),
            new inquirer.Separator('        -Misc Functions-'),
            new inquirer.Separator('-------------------------------'),
                'Delete Catagory Type',
                'View Department Budget',
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
    async addRole() {
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
                name: 'depID',
                message: "Select the associated department: ",
                choices: ['1', '2', '3', '4', '5', '6', '7'],
                when: (answers) => {
                    if (answers.newTitle === '') { return false } else { return true }
                }
            }
        ]);
    },
    async addEmployee() {
        return inquirer.prompt([
            {
                type: 'input',
                name: 'first',
                message: "Enter employees first name (leave blank to cancle): "
            },
            {
                type: 'input',
                name: 'last',
                message: "Enter employees last name: ",
                when: (answers) => {
                    if (answers.first === '') { return false } else { return true }
                }
            },
            {
                type: 'list',
                name: 'role',
                message: "Enter employees role ID: ",
                choices: ['1', '2', '3', '4', '5', '6', '7'],
                when: (answers) => {
                    if (answers.first === '') { return false } else { return true }
                }
            },
            {
                type: 'list',
                name: 'manager',
                message: "Enter employees manager ID: ",
                choices: ['1', '2', '3', '4', '5', '6', '7'],
                when: (answers) => {
                    if (answers.first === '') { return false } else { return true }
                }
            }
        ]);
    }
}