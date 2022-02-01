const DB = require('../db/connection');


//commands for drawing SQL tables
const sqlCommand = {
    async showDepartments() {

        return makeTable(`SELECT * FROM department`);
    
    },
    async showRoles() {
        return makeTable(`SELECT role.title, role.salary, department.name AS department_name
         FROM role
         LEFT JOIN department ON role.department_id = department.id
         ORDER BY department_name
         `);

    },
    async showEmployees() {
        return makeTable(`SELECT employee.first_name, employee.last_name, role.title AS role
        FROM employee
        LEFT JOIN role ON employee.role_id = role.id
        
        `);
    },
    async addDepartment(newDep) {
        return makeTable(`INSERT INTO department (name)
        VALUES
        ('${newDep}')`);
    },
    async addRole(newTitle, newSalary, depID) {
        return makeTable(`INSERT INTO role (title, salary, department_id)
        VALUES
        ('${newTitle}','${newSalary}', '${depID}')`);
    },
    async addEmployee(first, last, role, manager) {
        if (!manager[0]){
            return makeTable(`INSERT INTO employee (first_name, last_name,role_id,manager_id)
            VALUES
            ('${first}','${last}','${role}',NULL)`);
        } else {
            return makeTable(`INSERT INTO employee (first_name, last_name,role_id,manager_id)
            VALUES
            ('${first}','${last}','${role}','${manager}')`);
        };
        
    },
    async updateEmployeeRole(emplID, roleID) {
       return makeTable(`UPDATE employee SET role_id = '${roleID}' WHERE id = '${emplID}'`)
    },
    async updateEmployeeManager(emplID, managerID) {
        return makeTable(`UPDATE employee SET manager_id = '${managerID}' WHERE id = '${emplID}'`)
     },
    async showEmployeesByManager(){
        return makeTable(`SELECT employee.first_name, employee.last_name, employee.manager_id, role.title AS role, department.name AS department
        FROM employee
        LEFT JOIN role ON employee.role_id = role.id
        LEFT JOIN department ON role.department_id = department.id
        ORDER BY department, manager_id
        `);
    },
    async showEmployeesByDepartment(){
        return makeTable(`SELECT employee.first_name, employee.last_name, role.title AS role , department.name AS department
        FROM employee
        LEFT JOIN role ON employee.role_id = role.id
        LEFT JOIN department ON role.department_id = department.id
        ORDER BY department
        `);
    },
    async showDepartmentsByBudget() {
        return makeTable(`SELECT department.name AS department, SUM(role.salary) OVER (PARTITION BY department_id) AS budget
        FROM role
        LEFT JOIN department ON role.department_id = department.id
        GROUP BY department_id ORDER BY budget DESC
        `);
      

    },
    async deleteCatagory(table, id){
        
        await makeTable(`DELETE FROM ${table} WHERE id = '${id}'`);
    }
   
};

//function to draw SQL tables in console
function makeTable(sql) {

    return DB.promise().query(sql)
    .then(([rows, feilds]) => {
        console.table(rows);
    }).catch(console.log);

};

//functions to convert data from SQL database into arrays for inquirer prompts
const sqlData = {
    async makeArray(sql,key) {
        let dataArray = [];
       await DB.promise().query(sql)
        .then(([rows, feilds]) => {
            dataArray = rows.map(e => e[key]);
        }).catch(console.log);
        return dataArray;
    }    
}



module.exports = {
    sqlCommand,
    sqlData,
    makeTable
}