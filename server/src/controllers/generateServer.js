import { buildAllFiles } from '../../build/controllers/expressBuild/buildFiles.js';
import Config from '../../build/models/config.js';

export function generateExpressServer(request, response) {
  request.session.files = {
    serverJS: {
      type: 'main',
      name: 'server.js',
    },
  };
  const builtFiles = buildAllFiles(request, response);
  // Send these files to github!
  return JSON.stringify(builtFiles); // response.send(JSON.stringify(builtFiles));
}

export function generateServer(request, response) {
  const reqData = request.body.data;
  if (reqData && reqData.serverType && reqData.serverType === 'node-express') {
    // generate express server
    const data = generateExpressServer(request, response);
    const newConfig = new Config({ data });
    newConfig.save((err) => {
      if (err) {
        response.json(err);
      }
      response.json(newConfig);
    });
    response.send(generateExpressServer(request, response));
  }

  return response.status(400).send('No server type on request');
}
