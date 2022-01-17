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
return `To use this application, please follow the following steps:   ${install}
`
};

const createCredits = creditItem => {
    let allCredits = '';
    if (creditItem) {
        creditItem.forEach((credit) => {
    allCredits += `* [${credit.creditName}](https://github.com/${credit.creditLink})`;
        });
        return allCredits;
    } else {
        return '';
    }
};

/*const createUsage = (usage, screenshots) => {
  return `${usage} ${createScreenshots(screenshots)}`
};

const createScreenshots = screenshotItem => {
  let allScreenshots = '';
  if (screenshotItem) {
      screenshotItem.forEach(shot => {
      allScreenshots += `![${shot.screenshotAlt}](${shot.screenshotLink})
${shot.screenshotDesc}
`;
  });
  return `${allScreenshots}`;
  } else {
      return '';
  }
};*/

const createTableOfContents = contentsArr => {
  // creates contents list items based on user selection
  let contentsList = '';
  contentsArr.forEach((item) => {

      // indents 'Screenshots' list item
      if (item.content && item.header === 'Screenshots') {
      contentsList += `*[${item.header}](#${(item.header).toLowerCase()})
`;
      } else if (item.content) {
          contentsList += `* [${item.header}](#${(item.header).toLowerCase().split(' ').join('-')})
`;
      }
      contentsList += `
`
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

  const { title, github, repo, license } = data;

  let readmeContents = '';

  const sectionArr = [
    {
        header: 'Installation',
        content: createInstallation(data.installation)
    },
    /*{
        header: 'Usage',
        content: createUsage(data.usage)
    },*/
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
    /*
    {
        header: 'Contributing', 
        content: data.contributing 
    },
    {
        header: 'Tests',
        content: createTest(data.tests)
    },
    {
        header: 'Questions',
        content: createQuestions(data.questions, github, repo)
    },
    {
        header: 'Credits',
        content: createCredits(data.credits)
    },*/
];
  sectionArr.forEach((sectionItem) => {
    if (sectionItem.content && sectionItem.header === 'Screenshots') {
        readmeContents += `### ${sectionItem.header}
  ${sectionItem.content}
  `
    } else if (sectionItem.content) {
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