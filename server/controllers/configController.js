var Config = require('../models/config.js');

module.exports = {
  //all methods - createOne, delete, removeOne, signIn, signUp, checkAuth
  createOne: function(req, res, cb) {
    var newConfig = req.body;
    Config.create(newConfig, function(err, data) {
      if (err) {
        if (cb) { cb(err, null); }
        return res.json(err);
      }
      if (cb) { cb(null, err); }
      res.json(data);
    });
  },

  updateOne: function(req, res, cb) {
    var query = { _id: req.params.id };
    var updatedProps = req.body;
    var options = {
      new: true,
      upsert: true
    };
    Config.findOneAndUpdate(query, updatedProps, options, function(err, data) {
      if (err) {
        if(cb) { cb(err, null); }
        return res.json(err);
      }
      if (cb) { cb(null, data); }
      res.json(data);
    });
  },

  removeOne: function(req, res, cb) {
    var query = { _id: req.params.id };
    Config.findOneAndRemove(query, function(err, data) {
      if (err) {
        if (cb) { cb(err, null); }
        return res.json(err);
      }
      if (cb) { cb(null, data); }
      res.json(data);
    });
  },

  retrieveOne: function(req, res, cb) {
    var query = { _id: req.params.id };
    Config.findOne(query, function(err, data) {
      if (err) {
        return res.json(err);
        cb(err, null);
      }
      cb(null, data);
      res.json(data);
    });
  },

  retrieveAll: function(req, res, cb) {
    var query = req.query;
    Config.find(query, function(err, data) {
      if (err) {
        if (cb) {cb(err, null); }
        return res.json(err);
      }
      if (cb) { cb(null, data); }
      res.json(data);
    });
  },
};
