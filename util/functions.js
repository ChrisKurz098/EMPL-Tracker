
const userPrompts = require('../util/prompts');
const sqlCommand = require('./sqlCommands');



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
        .then( ({newDepName}) => {
            if (newDepName !== '')
            {
            sqlCommand.addDepartment(newDepName);
            console.log(`\n${newDepName} added to department list \n`);
            } else {
                console.log(`\ncanceled\n`);
            }
        });

    },
    /////
    async addARole() {
        await userPrompts.addRole()
        .then( ({newTitle,newSalary,depID}) => {
            if (newTitle !== '')
            {
            sqlCommand.addDepartment(newTitle,newSalary,depID);
            console.log(`\n${newTitle} added to roles list\n`);
            } else {
                console.log(`\ncanceled\n`);
            }
        });
    },
    /////
    async addAnEmployee() {
        console.log('6');
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