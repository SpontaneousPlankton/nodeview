import Config from '../models/config.js';

export function createOne(request, response) {
  const newConfig = new Config({
    "data.serverType": request.body.data.serverType,
    "data.appName": request.body.data.appName,
    "data.serverSettings.port": request.body.data.serverSettings.port,
    '$ push': { 'data.routers': { '$ each': request.body.routers },
    },
  });

  newConfig.save((err) => {
    if (err) {
      return response.status(500).json(err);
    }
    return response.send(newConfig);
  });
}
