// TODO: Include packages needed for this application
const inquirer = require('inquirer');
const fs = require('fs');
const generateMarkdown = require('./utils/generateMarkdown.js');



// TODO: Create an array of questions for user input
const questions =  [
        {
            type: 'input',
            name: 'title',
            message: 'What is the title of your project? (Required)',
            validate: titleInput => {
                if (titleInput) {
                    return true;
                } else {
                    console.log('Please enter your project title!');
                    return false;
                }
            }
          },
          {
            type: 'input',
            name: 'description',
            message: 'What is your projects description? (Required)',
            validate: descriptionInput => {
                if (descriptionInput) {
                    return true;
                } else {
                    console.log('Please enter a description of your project!');
                    return false;
                }
            }
        },
        {
            type: 'input',
            name: 'installation',
            message: 'What are the steps required to install your project? (Required)',
            validate: installationInput => {
                if (installationInput) {
                    return true;
                } else {
                    console.log('Please enter your installation steps!');
                    return false;
                }
            }
        },
        {
            type: 'input',
            name: 'usage',
            message: 'Provide instructions and examples for use. (Required)',       
            validate: usageInput => {
                if (usageInput) {
                    return true;
                } else {
                    console.log('Please provide your usage instructions!');
                    return false;
                }
            }
        },
        {
            type: 'input',
            name: 'usage',
            message: 'Provide instructions and examples for use. (Required)',       
            validate: usageInput => {
                if (usageInput) {
                    return true;
                } else {
                    console.log('Please provide your usage instructions!');
                    return false;
                }
            }
        },
        {
            type: 'checkbox',
            name: 'license',
            message: 'Please choose which license you will use for your project (Required)',       
            choices: ['agpl','MIT', 'GNU', 'Apache', 'No license'],
        },
        {
            type: 'checkbox',
            name: 'contents',
            message: 'Any additional sections you would like to include in your README?',
            choices: [
                {
                    name: 'Built With',
                    checked: false
                },
                {
                    name: 'Features',
                    checked: false
                },
                {
                    name: 'Contributing',
                    checked: false
                },
                {
                    name: 'Tests',
                    checked: false
                },
            ]
        },
    {
        type: 'checkbox',
        name: 'builtwith',
        message: 'Please select the technologies that your application was built with.',
        choices: ['HTML', 'CSS', 'SASS', 'JavaScript', 'Node.js', 'Express.js', 'JQuery'],
        default: 0,
        when: ({ contents }) => {
            if (contents.indexOf('Built With') > -1) {
                return true;
            } else {
                return false;
            }
        }
    }, 
];

const creditQues = [
    {
        type: 'input',
        name: 'creditName',
        message: 'What is the name of the collaborator? (Required)',
        validate: creditName => {
            if (creditName) {
                return true;
            } else {
                console.log('Please enter the collaborators name!');
                return false;
            }
        }
    },
    {
        type: 'input',
        name: 'creditLink',
        message: 'What is the collaborators github username?  (Required)',
        validate: creditLink => {
            if (creditLink) {
                return true;
            } else {
                console.log('Please enter the collaborators github username!');
                return false;
            }
        }
    },
    {
        type: 'confirm',
        name: 'confirmAddCredit',
        message: 'Would you like to add another credit?',
        default: false
    }
]

addCredits = readmeInfo => {
    
    // initiates array for credits
    if (!readmeInfo.credits) {
        readmeInfo.credits = [];
    };
    console.log(`
==============
Add New Credit
==============
    `);
    return inquirer.prompt(creditQues)
    .then(creditData => {
        // adds credits to array
        readmeInfo.credits.push(creditData);
        // will call addCredits again based on user input
        if (creditData.confirmAddCredit) {
            return addCredits(readmeInfo);
        } else {
            return readmeInfo;
        }
    });
};



// function to initialize program
function init() {
    return inquirer.prompt(questions);
};


// TODO: Create a function to write README file

function writeToFile(fileName, data) {
    fs.writeFile(`./dist/${fileName}`, data, err => {
        if (err) {
            throw err
        };
        console.log('Your README file is created!')
    });
};

//TODO: Create a function to initialize app
function init() {
    return inquirer.prompt(questions);
};

init()
    .then(response => addCredits(response))
    .then(answers => generateMarkdown(answers))
    .then(generatedReadme => writeToFile('README.md', generatedReadme))
    .catch(err => {
        console.log(err);
    });

