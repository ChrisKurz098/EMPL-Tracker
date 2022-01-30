
const inquirer = require('inquirer');

module.exports = {
    mainPrompt() {
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
    }
}