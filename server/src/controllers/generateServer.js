import { buildAllFiles } from '../../build/controllers/expressBuild/buildFiles.js';

export function generateExpressServer(request, response) {
  request.session.files = {
    serverJS: {
      type: 'main',
      name: 'server.js',
    },
  };
  const builtFiles = buildAllFiles(request, response);
  // Send these files to github!
  response.send(JSON.stringify(builtFiles));
}

export function generateServer(request, response) {
  const data = request.body.data;
  if (data && data.serverType && data.serverType === 'node-express') {
    // generate express server
    return generateExpressServer(request, response);
  }
  return response.status(400).send('No server type on request');
}
