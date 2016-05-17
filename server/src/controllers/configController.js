import Config from '../models/config.js';

export function createOne(request, response) {
  const newConfig = new Config({
    "data.serverType": request.body.data.serverType,
    "data.appName": request.body.data.appName,
    "data.serverSettings.port": request.body.data.serverSettings.port,
    "data.routers": [{
      id: request.body.data.routers[0].id,
      startPoint: request.body.data.routers[0].startPoint,
      endpoints: request.body.data.routers[0].endpoints,
      name: request.body.data.routers[0].name,
    }],
  });

  newConfig.save((err) => {
    if (err) {
      return response.status(500).json(err);
    }
    return response.send(newConfig);
  });
}
