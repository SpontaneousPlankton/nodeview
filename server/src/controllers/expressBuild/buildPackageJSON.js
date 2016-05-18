const addAppInfo = appDetails => {
  let fileString = '';

  fileString += `"name": "${appDetails.appName}",\n` +
  `\t"description": "CHANGE DESCRIPTION!!!!!!!!!",\n` +
  `\t"author": "${appDetails.cookies.user}",\n`;

  return fileString;
};

const addGitDetails = appDetails => {
  let fileString = '';

  fileString += `\t"repository": {\n` +
    `\t\t"type": "git",\n` +
    `\t\t"url": "https://github.com/${appDetails.cookies.user}/${appDetails.appName}"\n` +
    '\t},\n';

  return fileString;
};

const addDependencies = dependencies => {
  // get all dependencies in one object (TODO?), otherwise no params needed;
  let fileString = '';

  // currently only HARDCODING express dependency O_O
  fileString += `\t"dependencies": {\n` +
    `\t\t"express": "4.13.4"\n\t}\n`;
    // or "express": "*" for latest express version
  return fileString;
};

export function buildPackageJSON(fileConfig, userConfig) {
  let file = `{\n\t`;
  // add general details about the application:
  file += addAppInfo(userConfig);
  // add details about the repo:
  file += addGitDetails(userConfig);
  // add dependencies:
  file += addDependencies(userConfig);

  file += '}';
  return file;
}
