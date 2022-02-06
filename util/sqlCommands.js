const DB = require('../db/connection');


//commands for drawing SQL tables
const sqlCommand = {
    async showDepartments() {

        return makeTable(`SELECT * FROM department
        ORDER BY name`);

    },
    async showRoles() {
        return makeTable(`SELECT role.title, role.salary, department.name AS department_name
         FROM role
         LEFT JOIN department ON role.department_id = department.id
         ORDER BY department_name
         `);

    },
    async showEmployees(order) {
        return makeTable(`SELECT e.id,  e.first_name, e.last_name, role.title AS role,m.last_name AS managers_last_name
        FROM employee e
        LEFT JOIN role ON e.role_id = role.id
        LEFT JOIN employee m ON e.manager_id = m.id
        ORDER BY ${order}
        
        `);
    },
    async addDepartment(newDep) {
        return makeTable(`INSERT INTO department (name)
        VALUES
        ('${newDep}')`,false);
    },
    async addRole(newTitle, newSalary, depID) {
        return makeTable(`INSERT INTO role (title, salary, department_id)
        VALUES
        ('${newTitle}','${newSalary}', '${depID}')`,false);
    },
    async addEmployee(first, last, role, manager) {
        //if the manager id is undefined, run SQL code to make manager_id NULL for new employee
        if (!manager[0]) {
            return makeTable(`INSERT INTO employee (first_name, last_name,role_id,manager_id)
            VALUES
            ('${first}','${last}','${role}',NULL)`,false);
        } else {
            return makeTable(`INSERT INTO employee (first_name, last_name,role_id,manager_id)
            VALUES
            ('${first}','${last}','${role}','${manager}')`,false);
        };

    },
    async updateEmployeeRole(emplID, roleID) {
        return makeTable(`UPDATE employee SET role_id = '${roleID}' WHERE id = '${emplID}'`,false)
    },
    async updateEmployeeManager(emplID, managerID) {
        //if manager id was set to 'NULL, run SQL code that makes manager_id NULL
        if (managerID === 'NULL'){
            return makeTable(`UPDATE employee SET manager_id = NULL WHERE id = '${emplID}'`,false)
        } else {
        return makeTable(`UPDATE employee SET manager_id = '${managerID}' WHERE id = '${emplID}'`,false)
        }
    },
    async showEmployeesByManager() {

        return makeTable(`SELECT  e.first_name, e.last_name, department.name AS department, role.title AS role, m.last_name AS managers_last_name
        FROM employee e
        LEFT JOIN role ON e.role_id = role.id
        LEFT JOIN department ON role.department_id = department.id
        LEFT JOIN employee m ON e.manager_id = m.id
        ORDER BY managers_last_name, department
        `);
    },
    async showEmployeesByDepartment() {
        return makeTable(`SELECT employee.first_name, employee.last_name, role.title AS role , department.name AS department
        FROM employee
        LEFT JOIN role ON employee.role_id = role.id
        LEFT JOIN department ON role.department_id = department.id
        ORDER BY department
        `);
    },
    async showDepartmentsByBudget() {
        return makeTable(`SELECT department.name AS department, SUM(salary)  AS budget
        FROM role
        LEFT JOIN department ON role.department_id = department.id
        GROUP BY department_id ORDER BY budget DESC
        `);


    },
    async deleteCatagory(table, id) {

        await makeTable(`DELETE FROM ${table} WHERE id = '${id}'`,false);
    }

};

/*function to draw SQL tables in console. 
printIt specifies if it should print the table. 
This is used when a table is updated as opposed to being viewed 
due to how SQL query will respond with updated table stats and not a table*/
function makeTable(sql, printIt = true) {

    return DB.promise().query(sql)
        .then(([rows, feilds]) => {

            if (printIt) console.table(rows);
        }).catch(console.log);

};

//functions to convert data from SQL database into an array for inquirer prompts
//provide the sql syntax to get the data and the column name (retruned as a "key" in each row/object)
const sqlData = {
    async makeArray(sql, key) {
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

