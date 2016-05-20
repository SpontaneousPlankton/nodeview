import Config from '../models/config.js';

/* Update controller with the given user and appName
If it doesn't exist, create one */
export function createOne(request, response) {
  const oldConfig = { user: request.body.user, appName: request.body.data.appName };
  const newAttributes = {
    'data.serverType': request.body.data.serverType,
    'data.appName': request.body.data.appName,
    'data.serverSettings.port': request.body.data.serverSettings.port,
    'data.routers': request.body.data.routers,
    'data.github': request.body.data.github,
    'data.middleware': request.body.data.middleware,
  };

  Config.update(oldConfig, newAttributes, { upsert: true }, (err, result) => {
    if (err) {
      return response.status(500).json(err);
    }
    return response.send(result);
  });
}

export function getConfigs(request, response) {
  Config.find(({ user: request.cookies.user }), (err, configs) => {
    if (err) {
      return response.status(500).json(err);
    }
    return response.json(configs);
  });
}

export function deleteConfig(request, response) {
  Config.findOneAndRemove({ 'data.appName': request.body.data.appName }, (err) => {
    if (err) {
      return response.status(500).json(err);
    }
    // return remaining configs associated with user to update state
    return getConfigs(request, response);
  });
}

