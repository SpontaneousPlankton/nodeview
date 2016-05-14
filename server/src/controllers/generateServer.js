import { buildAllFiles } from './expressBuild/buildFiles.js';
import Config from './../models/config.js';
import { createRepo, createFile } from './githubController.js';

export function generate(request, response) {
  request.session.files = {
    serverJS: {
      type: 'main',
      name: 'server.js',
    },
  };

  if (request.body.data.routers.length) {
    request.session.files.routers = {
      type: 'router',
      name: request.body.data.routers,
    };
  }

  // copy cookies to body.data
  request.body.data.userName = request.cookies.user;
  request.body.data.token = request.cookies.user_session;
  const builtFiles = buildAllFiles(request, response);
  // Send these files to github!
  // Make repo (naming handled in controller)
  createRepo(request.body.data);
  // separate calls for every file
  // builtFiles will always only be [serverFile, [routerFiles]]
  builtFiles.forEach(file => {
    if (!Array.isArray(file)) {
      createFile(file, request.body.data, 'server.js');
    } else {
      file.forEach((routerFile, ind) => {
        createFile(routerFile, request.body.data.routers[ind]);
      });
    }
  });
  console.log(builtFiles);
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

