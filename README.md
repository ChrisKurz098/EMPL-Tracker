

# EMPL-Tracker

## Description
This is a command line app that uses a local SQL database to manage, store and update company employees, roles and departmnets. 

## Table of Contents  
    
* [Installation](#installation)
* [Usage](#usage) 
## Screenshots
![screenshotA](screenshotA.PNG)


## Installation
The app requires Node.js and SQL to be installed on the system.  
Once both are installed:  
- run: npm i from the EMPL_Tracker root folder (only needed initially) 
-  create a file named .env in the root of the EMPL-Tracker folder
-  add the following lines to .env, using your SQL credentials:  
        DB_USER=[your user name]  
        DB_PW= [your password]  
- log into mysql from the root folder EMPL-Tracker and run the following to create the needed database and tables:  
    source db/db.sql  
    source db/schema.sql  
    source db/seeds.sql (only needed for testing)  
    [This step is only needed initially]

- run: node EMPLT from the root directory
         

## Usage
Select an option from the main menu and follow the prompts to input or update data.  
# [Link to Video Preview](https://watch.screencastify.com/v/edWqJGJMJOdPy2cfkRGq)           
## Questions
Chris Kurz              [Github](https://github.com/chriskurz098)

If you have any questions, contact Chris Kurz at:

[ckurz098@gmail.com](mailto:ckurz098@gmail.com)

