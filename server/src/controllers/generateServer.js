import { buildAllFiles } from './expressBuild/buildFiles.js';
import Config from './../models/config.js';
import { createRepo, createFile } from './githubController.js';
import { extend } from './../utils/utils';

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
  // TODO: remove userInfo parameter
  extend(request.body.data.cookies, request.cookies);
  // EMAIL BUG: fix '@'
  // copy appName to routers obj
  request.body.data.routers.forEach(router => {
    router.appName = request.body.data.appName;
  });

  const builtFiles = buildAllFiles(request, response);
  // Send these files to github!
  // Make repo (naming handled in controller)
  createRepo(request.body.data).then(() => {
    // separate calls for every file
    // builtFiles will always only be [serverFile, [routerFiles]]
    createFile(builtFiles[0], request.body.data, request.body.data.cookies, 'server').then(() => {
      // successfully created server file
      const asyncRun = (filesArr, ind) => {
        ind = ind || 0;
        if (ind !== filesArr.length) {
          createFile(filesArr[ind], request.body.data.routers[ind], request.body.data.cookies).then(() => {
            asyncRun(filesArr, ind + 1);
          }).catch((routerErr) => {
            console.log(`Problem creating router files on your GitHub: Error: ${routerErr}`);
            response.status(400).send(`Problem creating router files on your GitHub: Error: ${routerErr}`);
          });
        } else {
          return;
        }
      };
      asyncRun(builtFiles[1], 0);
    }).catch(serverError => {
      console.log(`Error creating server ${serverError}`);
      response.status(400).send(`Error creating server: ${serverError}`);
    });
  }).catch((error) => {
    console.log(`Problem creating repo on your GitHub: Error: ${error}`);
    response.status(400).send(`Problem creating repo on your GitHub: Error: ${error}`);
  });
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

