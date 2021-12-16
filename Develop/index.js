// TODO: Include packages needed for this application
const inquirer = require('inquirer');
const fs = require('fs');
const generateMarkdown = require('./utils/generateMarkdown.js');



// TODO: Create an array of questions for user input
const questions = ()=> {
    return inquirer.prompt([
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
        /*{
            type: 'confirm',
            name: 'confirmCollaborators',
            message: 'Did you collaborate with other persons for this project?',
            default: false
        },
        {
            type: 'input',
            name: 'numberCollaborators',
            message: 'How many persons collaborated on this project?',
            when: ({ confirmCollaborators }) => confirmCollaborators
        },
        {
            type: 'input',
            name: 'collaboratorName',
            message: 'Enter name for collaborator number #${(i+1)}',       
        },
        {
            type: 'input',
            name: 'collaboratorGitHub',
            message: 'Enter github for collaborator number #${(i+1)}',       
        },
*/
        

    ])
};


/*const foorloop = number => {

    for(let i=0;i<number;i++){
        return inquirer.prompt([
            {
                type: 'input',
                name: `${(i+1)}collaboratorName`,
                message: `Enter name for collaborator number #${(i+1)}`,       
            },
            {
                type: 'input',
                name: `${(i+1)}collaboratorGithub`,
                message: `Enter github for collaborator number #${(i+1)}`,       
            },
        ]);
    }
}*/

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

init()
    .then(answers => generateMarkdown(answers))
    .then(generatedReadme => writeToFile('README.md', generatedReadme))
    .catch(err => {
        console.log(err);
    });

