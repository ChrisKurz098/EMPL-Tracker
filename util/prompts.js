
const inquirer = require('inquirer');

module.exports = {
   async mainPrompt() {
        return inquirer.prompt([{
            type: 'list',
            name: 'answer',
            message: 'Please Select an Option: ',
            choices: ['View All Departments',
                'View All Roles',
                'View All Employees',
                'Add A Department',
                'Add A Role',
                'Add An Employee',
                'Update An Employee Role',
                'Update Employee Manager',
                'View Employees By Manager',
                'Veiw Employees By Department',
                'Delete Catagory Type',
                'View Department Budget',
                'Quit']
        }]);
    },

    async addDepartment() {
        return inquirer.prompt([{
            type: 'input',
            name: 'newDepName',
            message: "Enter the name of the new Department (leave blank to cancle): "
        }]);
    },
    async  addRole() {
        return inquirer.prompt([
            {
                type: 'input',
                name: 'newTitle',
                message: "Enter the name of the new role (leave blank to cancle): "
            },
            {
                type: 'input',
                name: 'newSalary',
                message: "Enter a salary for this role: "
            },
            {
                type: 'list',
                name: 'depID',
                message: "Select the associated department: ",
                choices: ['1','2','3','4','5','6','7']
            }
        ]);
    }
}