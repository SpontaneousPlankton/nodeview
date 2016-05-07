'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _prettyError = require('pretty-error');

var _prettyError2 = _interopRequireDefault(_prettyError);

var _config = require('./config.js');

var _passport = require('passport');

var _passport2 = _interopRequireDefault(_passport);

var _routes = require('./router/routes');

var _routes2 = _interopRequireDefault(_routes);

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _expressSession = require('express-session');

var _expressSession2 = _interopRequireDefault(_expressSession);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import browserSync from 'browser-sync';

var server = (0, _express2.default)();
var router = _routes2.default;

_mongoose2.default.connect('mongodb://localhost/AppButler');

server.use((0, _expressSession2.default)({
  secret: 'plankton',
  resave: false,
  saveUninitialized: true
}));

var pe = new _prettyError2.default();
pe.start();

server.use(_express2.default.static(__dirname + '/../../client'));
server.use(_bodyParser2.default.json());

server.use(_passport2.default.initialize());
router(server, _express2.default);

server.listen(_config.port, function () {
  console.log('The server is running at http://localhost:' + _config.port);
  // Listen for the `init` event
  // browserSync({
  //   proxy: `localhost:${port}`,
  //   files: [
  //     `${__dirname}/../../client/**/*.{js}`,
  //     {
  //       match: ['wp-content/themes/**/*.php'],
  //     },
  //   ],
  // });
});

exports.default = server;