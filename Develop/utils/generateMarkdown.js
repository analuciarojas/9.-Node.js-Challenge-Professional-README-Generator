// Description function, returns description contents 

const renderDescription = description => {
      return `${description}`;
};

// Table of contents function, returns table of contents with elements selected by user 

const renderTableofcontents = contentArray => {
  // Creates table of content sections based on users choices
  
  let contentsList = '';
  contentArray.forEach((item) => {

    // If the section has contents then add the corresponding header to the table of contents list
if (item.content && item.content!='') {
    contentsList += `* [${item.header}](#${(item.header).toLowerCase().split(' ').join('-')})
`;
      }
  });
  return contentsList;
};

// Installation function, returns installation contents 

const renderInstallation = install => {
return `To use this application, please follow the following steps:  ${install}

`
};

// Usage function, returns usage contents 

const renderUsage = usage => {
  return `${usage}
`;
};

// Credits function, returns a list with the persons involved in the application with a link to their Github profiles

const renderCredits = creditName => {
  let allCredits = '';
  if (creditName) {
      creditName.forEach((credit) => {
  allCredits += `* [${credit.collabName}](https://github.com/${credit.collabGithub})
`;
      });
      return allCredits;
  } else {
      return '';
  }
};

// TODO: Create a function that returns a license badge based on which license is passed in
// If there is no license, return an empty string

const renderLicenseBadge = license => {
  // Added corresponging bage to each license with an option to click on its link 
  if (license != 'No license') {
    if(license=='GNU AGPL v3'){
      return `[![License: GPL v3](https://img.shields.io/badge/License-GPLv3-blue.svg)](https://www.gnu.org/licenses/gpl-3.0)
`;    
}
if(license=='GNU GPL v3'){
  return `[![License: GPL v3](https://img.shields.io/badge/License-GPLv3-blue.svg)](https://www.gnu.org/licenses/gpl-3.0)
`;    
}
if(license=='GNU LGPL v3'){
  return `[![License: LGPL v3](https://img.shields.io/badge/License-LGPL_v3-blue.svg)](https://www.gnu.org/licenses/lgpl-3.0)
`;    
}
if(license=='Mozilla Public License 2.0'){
  return `[![License: MPL 2.0](https://img.shields.io/badge/License-MPL_2.0-brightgreen.svg)](https://opensource.org/licenses/MPL-2.0)
`;    
}
if(license=='Apache 2.0'){
  return `[![License](https://img.shields.io/badge/License-Apache_2.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)
`;    
}
if(license=='mit'){
  return `[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
`;    
}  
    
  } else {
    return ' ';
  }
}

// TODO: Create a function that returns the license link
// If there is no license, return an empty string

const renderLicenseLink = license => {

  // added corresponding link to each license 
  if (license != 'No license') {
    if(license=='GNU AGPL v3'){
      return `[${license}](https://www.gnu.org/licenses/agpl-3.0)
`;    
}
if(license=='GNU GPL v3'){
  return `[${license}](https://www.gnu.org/licenses/gpl-3.0)
`;    
}
if(license=='GNU LGPL v3'){
  return `[${license}](https://www.gnu.org/licenses/lgpl-3.0)
`;    
}
if(license=='Mozilla Public License 2.0'){
  return `[${license}](https://opensource.org/licenses/MPL-2.0)
`;    
}
if(license=='Apache 2.0'){
  return `[${license}](https://opensource.org/licenses/Apache-2.0)
`;    
}
if(license=='mit'){
  return `[${license}](https://opensource.org/licenses/MIT)
`;    
}  
  } else {
    return ' ';
  }
}

// TODO: Create a function that returns the license section of README
// If there is no license, return a sentence where it states there is no license 

const renderLicenseSection = license => {
  if (license != 'No license') {
  return `
  The application is covered under the following license:
  ${renderLicenseLink(license)}
    `;
  } else {
    return `This application has no license
`;
  }
 }

// Build with function, adds the technologies used in the application in list form 

 const renderBuiltwith = builtWith =>{
  let allTechnologies = '';
  // for each technologie selected build a list item and return the array at the end
  if (builtWith) {
      builtWith.forEach(item => {
          allTechnologies += `* ${item}

`
      });
      return `${allTechnologies}`;
  } else {
      return '';
  };
};

// Feature function, adds the features of the application in a list form 

const renderFeatures = featureItem => {
  let allFeatures = '';

  // for each feature item it adds to a list and returns all the features at the end 
  if (featureItem) {
    featureItem.forEach((feature) => {
      allFeatures += `* ${feature.featureCount}

`;
      });
      return allFeatures;
  } else {
      return '';
  }
};

// Contributing function, adds the guidelines for people who wants to contribute in the application

const renderContributing = contributing => {
  // if contributing is not empty display the guidelines 

  if (contributing) {

  return `To contribute to this application, please follow the following guidelines:  ${contributing}
  
`
  }};

// Test function, adds the test info if there is any 

const renderTests = tests => {
  if (tests) {
    return `${tests}
    
`
}};

// TODO: Create a function to generate markdown for README
function generateMarkdown(data) {
  // Variable for table of contents
  let readmeContents = '';

  const sectionArr = [
    {
        header: 'Installation',
        content: renderInstallation(data.installation)
    },
    {
        header: 'Usage',
        content: renderUsage(data.usage)
    },
    {
      header: 'Credits',
      content: renderCredits(data.credits)
    },
    {
      header: 'License',
      content: renderLicenseSection(data.license)
  },
    {
        header: 'Built With',
        content: renderBuiltwith(data.builtwith)
    },
    {
        header: 'Features', 
        content: renderFeatures(data.features)
    },
    {
      header: 'Contributing', 
      content: renderContributing(data.contributing)
    },
    {
      header: 'Tests', 
      content: renderTests(data.tests)
    },
];
// for each section item check if there is any content before creating the header
  sectionArr.forEach((sectionItem) => {
    if (sectionItem.content) {
    readmeContents += `## ${sectionItem.header}
${sectionItem.content}
`;
    }
  });

// Returns basic title description structure and starts to call for table of contents function 

  return `# ${data.title}
${renderLicenseBadge(data.license)}

## Description
  ${renderDescription(data.description)}
  
## Table of Contents
  ${renderTableofcontents(sectionArr)}
${readmeContents}
`;
}

module.exports = generateMarkdown;