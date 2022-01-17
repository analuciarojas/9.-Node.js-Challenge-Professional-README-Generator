// TODO: Include packages needed for this application
const inquirer = require('inquirer');
const fs = require('fs');
const generateMarkdown = require('./utils/generateMarkdown.js');



// TODO: Create an array of questions for user input using validation for required fields
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
        // List input just to choose one option
        {
            type: 'list',
            name: 'license',
            default: 'No license',
            message: 'Please choose which license you will use for your project (Required)',       
            choices: ['GNU AGPL v3','GNU GPL v3','GNU LGPL v3', 'Mozilla Public License 2.0','Apache 2.0','mit', 'No license'],
        },
        // Checkbox for extra readme sections, to make more professional 
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
    // Include when, to make sure you selected that additional section 
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
    {
        type: 'input',
        name: 'contributing',
        message: 'Provide guidelines for other developers to contribute to this application. (Required)',       
        default: 0,
        when: ({ contents }) => {
            if (contents.indexOf('Contributing') > -1) {
                return true;
            } else {
                return false;
            }
        },
        validate: contributingInput => {
            if (contributingInput) {
                return true;
            } else {
                console.log('Please provide your contributing guidelines!');
                return false;
            }
        }
    },
    {
        type: 'input',
        name: 'tests',
        message: 'Provide tests for your application and examples on how to run them. (Required)',       
        default: 0,
        when: ({ contents }) => {
            if (contents.indexOf('Tests') > -1) {
                return true;
            } else {
                return false;
            }
        },
        validate: testsInput => {
            if (testsInput) {
                return true;
            } else {
                console.log('Please provide tests and examples!');
                return false;
            }
        }
    },
];

// Const to add collaborators who made the application along with their github usernames

const creditQuestions = [
    {
        type: 'input',
        name: 'collabName',
        message: 'What is the name of the collaborator? (Required)',
        validate: collabName => {
            if (collabName) {
                return true;
            } else {
                console.log('Please enter the collaborators name!');
                return false;
            }
        }
    },
    {
        type: 'input',
        name: 'collabGithub',
        message: 'What is the collaborators github username?  (Required)',
        validate: collabGithub => {
            if (collabGithub) {
                return true;
            } else {
                console.log('Please enter the collaborators github username!');
                return false;
            }
        }
    },
    {
        type: 'confirm',
        name: 'confirmNewcollab',
        message: 'Would you like to add another credit?',
        default: false
    }
]

// Function to call to ask for the collaborators for credit section 

addCollaborator = creditArray => {
    
    // Creates new credits array

    if (!creditArray.credits) {
        creditArray.credits = [];
    };
    console.log(`
==============
Add Collaborator
==============
    `);
    return inquirer.prompt(creditQuestions)
    .then(collabfeatureArray => {
        // Pushes name to array 
        creditArray.credits.push(collabfeatureArray);
        // If wanted another collaborator it calls addCollaborator function again 
        if (collabfeatureArray.confirmNewcollab) {
            return addCollaborator(creditArray);
        } else {
            return creditArray;
        }
    });
};

// Const to add applications features 

const featureQuestions = [
    {
        type: 'input',
        name: 'featureCount',
        message: 'What is one of your projects features? (Required)',
        validate: featureCount => {
            if (featureCount) {
                return true;
            } else {
                console.log('Please enter your projects features!');
                return false;
            }
        }
    },
    {
        type: 'confirm',
        name: 'confirmAddFeature',
        message: 'Would you like to add another feature?',
        default: false
    }
]

// Function to call to ask if you want to add more features 

addFeatures = featureArray => {
    
    // Creates array for features 

    if (!featureArray.features) {
        featureArray.features = [];
    };
    console.log(`
==============
Add New Feature
==============
    `);
    return inquirer.prompt(featureQuestions)
    .then(featureData => {
        // Adds new features to array
        featureArray.features.push(featureData);
        // Calls addFeatures if wanted more features
        if (featureData.confirmAddFeature) {
            return addFeatures(featureArray);
        } else {
            return featureArray;
        }
    });
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
    // Calls collaborator function
    .then(response => addCollaborator(response))
    .then(responsefeature => {
    // Calls feature function if you selected it on the extra sections
    if (responsefeature.contents.indexOf('Features') > -1) {
        return addFeatures(responsefeature);
    } else {
        return responsefeature;
    }
    })
    .then(answers => generateMarkdown(answers))
    .then(generatedReadme => writeToFile('README.md', generatedReadme))
    .catch(err => {
        console.log(err);
    });

