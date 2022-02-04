
console.log(`loading database...`);

const userPrompts = require('./util/prompts');
const runFunction = require('./util/functions');



console.log(`
Welcom to:
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



//recursive function that loops the main menu
    async function app() {
    let { answer } = await userPrompts.mainPrompt();

    if (answer === 'Quit') {
        console.log('Bye!');
        process.exit();
    };

    //make first letter lower case
    answer = answer.charAt(0).toLowerCase() + answer.slice(1);
    //remove spaces
    answer = answer.split(' ').join('');

    //run selected fucntion
      await runFunction[answer]() ;

    app();
};

//run app on boot
app();



