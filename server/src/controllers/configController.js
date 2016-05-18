import Config from '../models/config.js';
import User from '../models/user.js';

export function createOne(request, response) {
  User.findOne({ githubID: 'JeremyIR' }, (err, user) => {
    const newConfig = new Config({
      user: user,
      'data.serverType': request.body.data.serverType,
      'data.appName': request.body.data.appName,
      'data.serverSettings.port': request.body.data.serverSettings.port,
      'data.routers': request.body.data.routers,
    });
    newConfig.save((err, savedConfig) => {
      if (err) {
        return response.status(500).json(err);
      }
      return response.send(savedConfig);
    });
  });
}


