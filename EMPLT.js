const inquirer = require('inquirer');
const DB = require('mysql2');
const runFunction = require('./util/functions.js');


console.log(`
 _______ ___ ___ _______ ___        _______                 __               
|   _   |   Y   |   _   |   |______|       .----.---.-.----|  |--.-----.----.
|.  1___|.      |.  1   |.  |______|.|   | |   _|  _  |  __|    <|  -__|   _|
|.  __)_|. \\_/  |.  ____|.  |___    -|.  |-|__| |___._|____|__|__|_____|__|  
|:  1   |:  |   |:  |   |:  1   |    |:  |                                   
|::.. . |::.|:. |::.|   |::.. . |    |::.|                                   
'-------'--- ---'---'   '-------'    '---'      
==============================================================================                             
            ------------SQL Employee Tracker By Chris Kurz------------      
==============================================================================                                                                 
`);


function mainPrompt() {

    return inquirer.prompt([
        {
            type: 'list',
            name: 'answer',
            message: 'Please Select an Option: ',
            choices: [
                'View All Departments',
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
                'Quit'
            ]
        }
    ]);
}




async function app() {
    let { answer } = await mainPrompt();

    if (answer === 'Quit') return;

    //convert first letter to lower for camelCase
    answer = answer.charAt(0).toLowerCase() + answer.slice(1)
    //remove spaces
    answer = answer.split(' ').join('');
    console.log(typeof answer, answer);
    runFunction[answer]();
    app();
}


app();