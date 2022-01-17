// TODO: Create a function that returns a license badge based on which license is passed in
// If there is no license, return an empty string
function renderLicenseBadge(license) {}

// TODO: Create a function that returns the license link
// If there is no license, return an empty string
function renderLicenseLink(license) {}

// TODO: Create a function that returns the license section of README
// If there is no license, return an empty string
function renderLicenseSection(license) {}


const createDescription = description => {
      return `${description}`;
};

const createInstallation = install => {
      return `To use this application, please follow the following steps:   ${install}
      `
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
      contentsList += `   *[${item.header}](#${(item.header).toLowerCase()})
`;
      } else if (item.content) {
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
          allTechnologies += `* ${item}`
      });
      return `${allTechnologies}`;
  } else {
      return '';
  };
};

const createLicense = license => {
  if (license) {
      return `This application is licensed under the ${license} license.`;
  } else {
      return '';
  }
};


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
        header: 'Built With',
        content: createBuiltWith(data.builtwith)
    },
    {
        header: 'License',
        content: createLicense(license)
    },/*
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
  
## Description
  ${createDescription(data.description)}
  
## Table of Contents
  ${createTableOfContents(sectionArr)}
  ${readmeContents}`;
}

module.exports = generateMarkdown;