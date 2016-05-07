// var jwt = require('jwt-simple');
// var passport = require('passport');
import User from '../models/user.js';

module.exports = {
  // all methods - createOne, delete, removeOne, signIn, signUp, checkAuth
  createOne: (req, res, cb) => {
    const newUser = req.body;
    User.create(newUser, (err, data) => {
      if (err) {
        if (cb) { cb(err, null); }
        res.json(err);
      }
      if (cb) { cb(null, err); }
      res.json(data);
    });
  },

  updateOne: (req, res, cb) => {
    const query = { _id: req.params.id };
    const updatedProps = req.body;
    const options = {
      new: true,
      upsert: true,
    };
    User.findOneAndUpdate(query, updatedProps, options, (err, data) => {
      if (err) {
        if (cb) { cb(err, null); }
        res.json(err);
      }
      if (cb) { cb(null, data); }
      res.json(data);
    });
  },

  removeOne: (req, res, cb) => {
    const query = { _id: req.params.id };
    User.findOneAndRemove(query, (err, data) => {
      if (err) {
        if (cb) { cb(err, null); }
        res.json(err);
      }
      if (cb) { cb(null, data); }
      res.json(data);
    });
  },

  retrieveOne: (req, res, cb) => {
    const query = { _id: req.params.id };
    User.findOne(query, (err, data) => {
      if (err) {
        res.json(err);
        cb(err, null);
      }
      cb(null, data);
      res.json(data);
    });
  },

  retrieveAll: (req, res, cb) => {
    const query = req.query;
    User.find(query, (err, data) => {
      if (err) {
        if (cb) {cb(err, null); }
        res.json(err);
      }
      if (cb) { cb(null, data); }
      res.json(data);
    });
  },

  // signin: (req, res, next) => {
  //   const email = req.body.email;
  //   const password = req.body.password;
  //   const name = req.body.name;

  //   User.findOne({ email: email }, (err, user) => {
  //     if (!user) {
  //       console.log('User does not exist ', err);
  //       const newUser = new User({ email: email, name: name, password: password })
  //       .save();
  //       next(newUser);
  //     } else {
  //       next(user);
  //     }
  //   });
  // },
  // checkAuth: (req, res, next) => {
  //   const token = req.headers['x-access-token'];
  //   if (!token) {
  //     next(new Error('No token'));
  //   } else {
  //     const user = jwt.decode(token);
  //     User.findOne({email: email}, (err, foundUser) => {
  //       if (foundUser) {
  //         res.send(200);
  //       } else {
  //         res.send(401);
  //       }
  //     });
  //   }
  // },
};
