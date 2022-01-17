// TODO: Create a function that returns a license badge based on which license is passed in
// If there is no license, return an empty string

// TODO: Create a function that returns the license link
// If there is no license, return an empty string

// TODO: Create a function that returns the license section of README
// If there is no license, return an empty string


const createDescription = description => {
      return `${description}`;
};

const createInstallation = install => {
return `To use this application, please follow the following steps:  ${install}

`
};

const createContributing = contributing => {
  if (contributing) {

  return `To contribute to this application, please follow the following guidelines:  ${contributing}
  
`
  }};

const createTests = tests => {
  if (tests) {
    return `${tests}
    
`
}};

const createCredits = creditItem => {
    let allCredits = '';
    if (creditItem) {
        creditItem.forEach((credit) => {
    allCredits += `* [${credit.creditName}](https://github.com/${credit.creditLink})
`;
        });
        return allCredits;
    } else {
        return '';
    }
};

const createFeatures = featureItem => {
  let allFeatures = '';
  if (featureItem) {
    featureItem.forEach((feature) => {
      allFeatures += `* ${feature.featureName}

`;
      });
      return allFeatures;
  } else {
      return '';
  }
};

const createUsage = usage => {
  return `${usage}`;
};

const createTableOfContents = contentsArr => {
  // creates contents list items based on user selection
  let contentsList = '';
  contentsArr.forEach((item) => {

if (item.content && item.content!='') {
    contentsList += `* [${item.header}](#${(item.header).toLowerCase().split(' ').join('-')})
`;
      }
  });
  return contentsList;
};

const createBuiltWith = builtWith =>{
  let allTechnologies = '';

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


// Function that returns a license badge based on which license is passed in
// If there is no license, return an empty string
const renderLicenseBadge = license => {
  if (license !== 'no license') {
    return `
  ![badge](https://img.shields.io/badge/license-${license}-blue)
    `;
  } else {
    return ' ';
  }
}

// Function that returns the license link
// If there is no license, return an empty string
const renderLicenseLink = license => {
  if (license !== 'no license') {
  return `
  [${license}](https://choosealicense.com/licenses/${license}/)
    `;
  } else {
    return ' ';
  }
}

// Function that returns the license section of README
// If there is no license, return an empty string
const renderLicenseSection = license => {
  if (license !== 'no license') {
  return `
  The application is covered under the following license:
  ${renderLicenseLink(license)}
    `;
  } else {
    return ' ';
  }
 }

// TODO: Create a function to generate markdown for README
function generateMarkdown(data) {

  let readmeContents = '';

  const sectionArr = [
    {
        header: 'Installation',
        content: createInstallation(data.installation)
    },
    {
        header: 'Usage',
        content: createUsage(data.usage)
    },
    {
      header: 'Credits',
      content: createCredits(data.credits)
    },
    {
      header: 'License',
      content: renderLicenseSection(data.license)
  },
    {
        header: 'Built With',
        content: createBuiltWith(data.builtwith)
    },
    {
        header: 'Features', 
        content: createFeatures(data.features)
    },
    {
      header: 'Contributing', 
      content: createContributing(data.contributing)
    },
    {
      header: 'Tests', 
      content: createTests(data.tests)
    },
];
  sectionArr.forEach((sectionItem) => {
    if (sectionItem.content) {
    readmeContents += `## ${sectionItem.header}
${sectionItem.content}
`;
    }
  });


  return `# ${data.title}
${renderLicenseBadge(data.license)}

## Description
  ${createDescription(data.description)}
  
## Table of Contents
  ${createTableOfContents(sectionArr)}
${readmeContents}
`;
}

module.exports = generateMarkdown;