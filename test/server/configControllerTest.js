import Config from '../../server/src/models/config.js';
import configController from '../../server/src/controllers/configController.js';


let chai = require('chai');
chai.should();
var expect = require('chai').expect;
let { it, before, after, beforeEach, afterEach } = require('arrow-mocha/es5');

// import middleware
import mongoose from 'mongoose';
import httpMocks from 'node-mocks-http';


let dbURI = 'mongodb://localhost/butler';

// The `clearDB` helper function, when invoked, will clear the database
const clearDB = (done) => {
  mongoose.connection.collections.configs.remove(done);
};

describe('Config Controller', () => {
  // Connect to database before any tests
  before((done) => {
    if (mongoose.connection.db) {
      done();
    }
    mongoose.connect(dbURI, done);
  });
});
