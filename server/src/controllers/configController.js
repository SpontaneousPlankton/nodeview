import Config from '../models/config.js';

export function createOne(request, response) {
  const newConfig = new Config({});
  newConfig.save((err) => {
    if (err) {
      return response.status(500).json(err);
    }
    return response.json(newConfig);
  });
}
