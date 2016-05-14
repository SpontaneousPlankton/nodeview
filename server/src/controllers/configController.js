import Config from '../models/config.js';

export function createOne(request, response) {
  const newConfig = new Config({
    appName: request.body.appName,
    port: request.body.port,
    expressName: request.body.expressName,
    serverType: request.body.serverType,
  });
  newConfig.save((err) => {
    if (err) {
      response.json(err);
    }
    response.send(JSON.stringify(newConfig));
  });
}
//   updateOne: (req, res, cb) => {
//     const query = { _id: req.params.id };
//     const updatedProps = req.body;
//     const options = {
//       new: true,
//       upsert: true,
//     };

//     Config.findOneAndUpdate(query, updatedProps, options, (err, data) => {
//       if (err) {
//         if (cb) { cb(err, null); }
//         res.json(err);
//       } if (cb) { cb(null, data); }
//       res.json(data);
//     });
//   },

//   removeOne: (req, res, cb) => {
//     const query = { _id: req.params.id };
//     Config.findOneAndRemove(query, (err, data) => {
//       if (err) {
//         if (cb) { cb(err, null); }
//         res.json(err);
//       } if (cb) { cb(null, data); }
//       res.json(data);
//     });
//   },

//   retrieveOne: (req, res, cb) => {
//     const query = { _id: req.params.id };
//     Config.findOne(query, (err, data) => {
//       if (err) {
//         res.json(err);
//         cb(err, null);
//       }
//       cb(null, data);
//       res.json(data);
//     });
//   },

//   retrieveAll: (req, res, cb) => {
//     const query = req.query;
//     Config.find(query, (err, data) => {
//       if (err) {
//         if (cb) { cb(err, null); }
//         res.json(err);
//       }
//       if (cb) { cb(null, data); }
//       res.json(data);
//     });
//   },
// };
