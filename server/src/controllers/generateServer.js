import { buildAllFiles } from './expressBuild/buildFiles.js';
import Config from './../models/config.js';
import { createRepo, createFile } from './githubController.js';

export function generate(request, response) {
  request.session.files = {
    serverJS: {
      type: 'main',
      name: 'server',
    },
  };

  if (request.body.data.routers.length) {
    request.session.files.routers = {
      type: 'router',
      name: request.body.data.routers,
    };
  }

  // copy cookies to body.data
  request.body.data.cookies = {};
  request.body.data.cookies.email = request.cookies.email; // email bug: can't store '@'
  request.body.data.cookies.userName = request.cookies.user;
  request.body.data.cookies.token = request.cookies.user_session;
  const builtFiles = buildAllFiles(request, response);
  // Send these files to github!
  // Make repo (naming handled in controller)
  createRepo(request.body.data).then(() => {
    // separate calls for every file
    // builtFiles will always only be [serverFile, [routerFiles]]
    builtFiles.forEach(file => {
      if (!Array.isArray(file)) {
        createFile(file, request.body.data, request.body.data.cookies, 'server').then(() => {
          // successfully created server file
          response.send('Server file successfully created');
        }).catch(error => {
          response.status(400).send(`Problem creating server file: Error: ${error}`);
        });
      } else {
        file.forEach((routerFile, ind) => {
          createFile(routerFile, request.body.data.routers[ind], request.body.data.cookies).then(() => {
            // successfully created router files
            response.send('Router files successfully created');
          }).catch(error => {
            // error creating router files
            response.status(400).send(`Problem creating router files: Error: ${error}`);
          });
        });
      }
    });
    // successfully created repo
    response.send(`${request.body.data.appName} created`);
  }).catch((error) => {
    response.status(400).send(`Problem creating repo on your GitHub: Error: ${error}`);
  });
  return response.json(builtFiles);
}

export function generateFiles(request, response) {
  const reqData = request.body.data;
  // console.log(reqData);
  if (!reqData.serverType) {
    return response.status(400).send(new Error('No server type on request'));
  }

  // generate express server
  return generate(request, response);
}


export function createConfig(request, response) {
  const newConfig = new Config({
    appName: request.body.appName,
    port: request.body.port,
    expressName: request.body.expressName,
    serverType: request.body.serverType,
  });
  newConfig.save((err) => {
    if (err) {
      return response.status(500).json(err);
    }
    return response.json(newConfig);
  });
}

