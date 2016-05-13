import { buildAllFiles } from '../../build/controllers/expressBuild/buildFiles.js';
import Config from '../../build/models/config.js';

export function generateExpressServer(request, response) {
  request.session.files = {
    serverJS: {
      type: 'main',
      name: 'server.js',
    },
  };

  request.body.data.routers.forEach(router => {
    request.session.files[router.id] = {
      type: 'router',
      name: router.name,
      // startPoint: router.startPoint,
      // endPoint: router.endpoints,
    };
  });
  console.log(request.session.files);

  const builtFiles = buildAllFiles(request, response);
  // Send these files to github!
  return response.json(builtFiles);
}

export function generateServer(request, response) {
  const reqData = request.body.data;
  if (!reqData.serverType) {
    return response.status(400).send(new Error('No server type on request'));
  }

  // generate express server
  return generateExpressServer(request, response);
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

