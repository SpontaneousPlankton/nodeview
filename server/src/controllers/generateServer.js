import { buildAllFiles } from '../../build/controllers/expressBuild/buildFiles.js';

export function generateExpressServer(request, response) {
  request.session.files = {
    serverJS: {
      type: 'main',
      name: 'server.js',
    },
  };
  for (let router in request.session.routers) {
    request.session.files[router.name] = { type: 'router', name: router.name };
  }
  const builtFiles = buildAllFiles(request, response);
  // Send these files to github!
  return response.send(JSON.stringify(builtFiles));
}

export function generateServer(request, response) {
  const reqData = request.body.data;
  if (reqData && reqData.serverType && reqData.serverType === 'express') {
    // generate express server
    return generateExpressServer(request, response);
  }
  return response.status(400).send('No server type on request');
}




