import { buildAllFiles } from './expressBuild/buildFiles.js';
import Config from './../models/config.js';

export function generateFiles(request, response) {
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
  // console.log(request.session.files);

  const builtFiles = buildAllFiles(request, response);
  // Send these files to github!
  return response.json(builtFiles);
}

export function generateServer(request, response) {
  const reqData = request.body.data;
  // console.log(reqData);
  if (!reqData.serverType) {
    return response.status(400).send(new Error('No server type on request'));
  }

  // generate express server
  return generateFiles(request, response);
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

