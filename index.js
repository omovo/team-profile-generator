const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./src/page-template.js");

const theTeam = [];


// TODO: Write Code to gather information about the development team members, and render the HTML file.


// Need to start the questions
function start() {
    inquirer.prompt([{
        //manager questions
        type: 'input',
        name: 'name',
        message: 'Welcome to the Team Profile Generator. Please enter the Team Manager\'s name.',
        validate: function (input) {
            if (input) {
                return true;
            } else {
                console.log('This field cannot be left blank')
                return false;
            }
        },
    },
    {
        type: 'input',
        name: 'id',
        message: 'Please enter the Manager\'s ID number',
        validate: function (input) {
            // if is not a number, return the string as a number to pass as true
            if (!isNaN(parseInt(input))) {
                return true;
            } else {
                console.log('You must enter a valid number');
                return false;
            }
        }
    },
    {
        type: 'input',
        name: 'email',
        message: 'Please enter the manager\'s email address',
        validate: function (input){
            let validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
            if (input.match(validRegex)) {
                return true;
            } else {
                console.log('Please enter a valid email address');
                return false;
            }
        }
    },
    {
        type: 'input',
        name: 'officeNumber',
        message: 'Please enter the manager\'s Office Number', validate: function (input) {
            // if is not a number, return the string as a number to pass as true
            if (!isNaN(parseInt(input))) {
                return true;
            } else {
                console.log('You must enter a valid number');
                return false;
            }
        }
    },

    ]).then(response => {
        // push manager responses to theTeam variable
        theTeam.push(new Manager(response.name, response.id, response.email, response.officeNumber));
        promptForNextEmployee();
    })

}


const promptForNextEmployee = () => {
    inquirer.prompt([{
        // choice of 3
        type: 'list',
        name: 'type',
        message: 'What Type of Team Member would you like to add?',
        choices: ['Engineer', 'Intern', 'Finish adding Team Members'],

    }
    ]).then(response => {
        // two ways of doing a condition check
        if (response.type.includes("Engineer")) {
            promptForEngineer();
        } else if (response.type === "Intern") {
            promptForIntern();
            // use the functionality from page-template to generate the team
        } else {
            buildPage();
            console.log('End Programme');
        }
    })
}

const promptForEngineer = () => {
    inquirer.prompt([{
        type: 'input',
        name: 'name',
        message: 'What is the Engineer\'s name?',
        validate: function (input) {
            if (input) {
                return true;
            } else {
                console.log('This field cannot be left blank')
                return false;
            }
        },
    },
    {
        type: 'input',
        name: 'id',
        message: 'Please enter the Engineer\'s ID number', 
        validate: function (input) {
            // if is not a number, return the string as a number to pass as true
            if (!isNaN(parseInt(input))) {
                return true;
            } else {
                console.log('You must enter a valid number');
                return false;
            }
        }
    },
    {
        type: 'input',
        name: 'email',
        message: 'Please enter the Engineer\'s email address',
        validate: function (input){
            let validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
            if (input.match(validRegex)) {
                return true;
            } else {
                console.log('Please enter a valid email address');
                return false;
            }
        }
    },
    {
        type: 'input',
        name: 'github',
        message: 'Please enter the Engineer\'s Github username',
    },
    ]).then(response => {
        // push Engineer responses to theTeam variable
        theTeam.push(new Engineer(response.name, response.id, response.email, response.github));
        promptForNextEmployee();
    })
}

const promptForIntern = () => {
    inquirer.prompt([{
        type: 'input',
        name: 'name',
        message: 'What is the Intern\'s name?',
        validate: function (input) {
            if (input) {
                return true;
            } else {
                console.log('This field cannot be left blank')
                return false;
            }
        },
    },
    {
        type: 'input',
        name: 'id',
        message: 'Please enter the Intern\'s ID number',
        validate: function (input) {
            // if is not a number, return the string as a number to pass as true
            if (!isNaN(parseInt(input))) {
                return true;
            } else {
                console.log('You must enter a valid number');
                return false;
            }
        }
    },
    {
        type: 'input',
        name: 'email',
        message: 'Please enter the Intern\'s email address',
        validate: function (input){
            let validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
            if (input.match(validRegex)) {
                return true;
            } else {
                console.log('Please enter a valid email address');
                return false;
            }
        }
    },
    {
        type: 'input',
        name: 'school',
        message: 'Please enter the Intern\'s School',
        validate: function (input) {
            if (input) {
                return true;
            } else {
                console.log('This field cannot be left blank')
                return false;
            }
        },
    },
    ]).then(response => {
        // add new intern to employees array
        // promptForNextEmployee
        theTeam.push(new Intern(response.name, response.id, response.email, response.school));
        promptForNextEmployee();
    })
}

const buildPage = () => {
    // render(theTeam - render is called at the top with require - this is the page template file)
    const generatedHTML = render(theTeam);

    fs.writeFile(outputPath, generatedHTML, (err) =>
        err ? console.log(err) : console.log('You have generated a team member page in the output folder, named team.html'));

}

start();
