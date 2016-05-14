import Config from '../../server/build/models/config.js';
import configController from '../../server/build/controllers/configController.js';

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

  // Clear database before each test and then seed it with example `users` so that you can run tests
  beforeEach((done) => {
    clearDB(() => {
      const users = [
        {
          name: 'Jeremy',
          email: 'jeremy@jeremy.com',
          githubID: '1456CD1V76F',
          key: 'a8s79y987a869df4',
          files: [],
        },
        {
          name: 'Sofia',
          email: 'sofia@sofia.com',
          githubID: '67ACD5429B1',
          key: '7364929d97639416jlk3847',
          files: [],
        },
        {
          name: 'Reid',
          email: 'reid@reid.com',
          githubID: '72DA845F7E',
          key: '66785f583867j8934a',
          files: [],
        },
        {
          name: 'Dylan',
          email: 'dylan@dylan.com',
          githubID: 'E498AB3652',
          key: '65kh2348yqbi2934j03',
          files: [],
        },
        {
          name: 'Zach',
          email: 'zach@zach.com',
          githubID: '26AB346C7C',
          key: '3476q6234cad86',
          files: [],
        },
      ];


      // See http://mongoosejs.com/docs/models.html for details on the `create` method
      User.create(users, (err) => {
        const firstID = users[0]._id;
        const secondID = users[1]._id;
        const configs = [
          {
            userID: firstID,
            data: 'this is the data',
          },
          {
            userID: secondID,
            data: 'this is also the data',
          },
        ];
        Config.create(configs, done);
      });
    });
  });


  it('should have a method that creates a config from the information in the request body', (done) => {
    const request = httpMocks.createRequest({
      method: 'POST',
      url: '/config',
      body: {
        userID: 'AFADC',
        data: 'this is the data',
      },
    });

    const response = httpMocks.createResponse();
    Config.findOne({ data: 'this is the data' }, (err, config) => {
      let id = config.id;
      configController.createOne(request, response);
      Config.findOne({ data: 'this is the data' }, (err, config) => {
        expect(err).to.equal(null);
        expect(config.data).to.equal('this is the data');
        done();
      });
    });
  });

  it('should update the attributes of the given config', (done) => {
    Config.findOne({ data: 'this is the data' }, (err, config) => {
      expect(err).to.equal(null);
      const id = config.id;
      const request = httpMocks.createRequest({
        method: 'PUT',
        url: '/config',
        params: { id: id },
        body: {
          data: 'this is NOT the data',
        },
      });

      const response = httpMocks.createResponse();
      configController.updateOne(request, response);
      Config.findOne({ data: 'this is NOT the data' }, (err, config) => {
        expect(err).to.equal(null);
        expect(config.data).to.equal('this is NOT the data');
        done();
      });
    });
  });


  it('should remove the config with the given data from the database', (done) => {
    Config.findOne({ data: 'this is the data' }, (err, config) => {
      expect(err).to.equal(null);
      const id = config.id;
      const request = httpMocks.createRequest({
        method: 'DELETE',
        url: '/config',
        params: { id: id },
      });
      const response = httpMocks.createResponse();
      configController.removeOne(request, response);
      Config.findOne({ data: 'this is the data' }, (err, config) => {
        expect(err).to.equal(null);
        done();
      });
    });
  });

  it('should retrieve the config with the given data from the database', (done) => {
    Config.findOne({ data: 'this is also the data' }, (err, config) => {
      expect(err).to.equal(null);
      const id = config.id;
      const request = httpMocks.createRequest({
        method: 'GET',
        url: '/config',
        params: { id: id },
      });
      const response = httpMocks.createResponse();
      configController.retrieveOne(request, response, (err, config) => {
        expect(config.data).to.equal('this is also the data');
        done();
      });
    });
  });

  it('should retrieve all the config data from the database', (done) => {
    Config.findOne({ data: 'this is also the data' }, (err, config) => {
      expect(err).to.equal(null);
      const id = config.id;
      const request = httpMocks.createRequest({
        method: 'GET',
        url: '/config',
      });
      const response = httpMocks.createResponse();
      configController.retrieveAll(request, response, (err, data) => {
        expect(data.length).to.equal(2);
        done();
      });
    });
  });
});
