var expect = require('chai').expect;
var should = require('chai').should;
var mongoose = require('mongoose');
var User = require('../../server/models/butlerUser.js');
var userController = require('../../server/controllers/userController.js');

var Config = require('../../server/models/config.js');
var configController = require('../../server/controllers/configController.js');
// npm install --save-dev node-mocks-http
var httpMocks = require('node-mocks-http');


var dbURI = 'mongodb://localhost/butler';

// The `clearDB` helper function, when invoked, will clear the database
var clearDB = function (done) {
  mongoose.connection.collections['configs'].remove(done);
};

describe('Config Controller', function () {

  // Connect to database before any tests
  before(function (done) {
    if (mongoose.connection.db) {
      return done();
    }
    mongoose.connect(dbURI, done);
  });

  // Clear database before each test and then seed it with example `users` so that you can run tests
  beforeEach(function (done) {
    clearDB(function () {
      var users = [
        {
          name: 'Jeremy',
          email: 'jeremy@jeremy.com',
          githubID: '1456CD1V76F',
          key: 'a8s79y987a869df4',
          files: []
        },
        {
          name: 'Sofia',
          email: 'sofia@sofia.com',
          githubID: '67ACD5429B1',
          key: '7364929d97639416jlk3847',
          files: []
        },
        {
          name: 'Reid',
          email: 'reid@reid.com',
          githubID: '72DA845F7E',
          key: '66785f583867j8934a',
          files: []
        },
        {
          name: 'Dylan',
          email: 'dylan@dylan.com',
          githubID: 'E498AB3652',
          key: '65kh2348yqbi2934j03',
          files: []
        },
        {
          name: 'Zach',
          email: 'zach@zach.com',
          githubID: '26AB346C7C',
          key: '3476q6234cad86',
          files: []
        }
      ];


      // See http://mongoosejs.com/docs/models.html for details on the `create` method
      User.create(users, function(err, users) {
        var firstID = users[0]._id;
        var secondID = users[1]._id;
        var configs = [
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


  it('should have a method that creates a config from the information in the request body', function (done) {
    var request = httpMocks.createRequest({
      method: 'POST',
      url: '/config',
      body: {
        userID: 'AFADC',
        data: 'this is the data',
      }
    });
    var response = httpMocks.createResponse();
    Config.findOne({data:'this is the data'}, function(err, config) {
      var id = config.id;
      configController.createOne(request, response);
      Config.findOne({data: 'this is the data'}, function(err, config) {
        expect(err).to.equal(null);
        expect(config.data).to.equal('this is the data');
        done();
      });
    });
  });

  it('should update the attributes of the given config', function (done) {
    Config.findOne({ data: 'this is the data'}, function(err, config) {
      expect(err).to.equal(null);
      var id = config.id;
      var request = httpMocks.createRequest({
        method: 'PUT',
        url: '/config',
        params: { id: id },
        body: {
         data: 'this is NOT the data'
        },
      });
      var response = httpMocks.createResponse();
      configController.updateOne(request, response);
      Config.findOne({ data: 'this is NOT the data'}, function(err, config) {
        expect(err).to.equal(null);
        expect(config.data).to.equal('this is NOT the data');
        done();
      });
    });
  });


  it('should remove the user with the given id from the database', function (done) {
    User.findOne({ name: 'Zach' }, function(err, user) {
      expect(err).to.equal(null);
      var userid = user.id;
      var request = httpMocks.createRequest({
        method: 'DELETE',
        url: '/user',
        params: { id: userid },
      });
      var response = httpMocks.createResponse();
      userController.removeOne(request, response);
      User.findOne({ name: 'Zach' }, function(err, user) {
      expect(err).to.equal(null);
        done();
      });
    });
  });

  it('should retrieve the user with the given id from the database', function (done) {
    User.findOne({ name: 'Zach' }, function(err, user) {
      expect(err).to.equal(null);
      var userid = user.id;
      var request = httpMocks.createRequest({
        method: 'GET',
        url: '/user',
        params: { id: userid }
      });
      var response = httpMocks.createResponse();
      userController.retrieveOne(request, response, function(err, data) {
        expect(data.name).to.equal('Zach');
        done();
      });
    });
  })

  it('should retrieve all the users from the database', function (done) {
    User.findOne({ name: 'Zach' }, function(err, user) {
      expect(err).to.equal(null);
      var userid = user.id;
      var request = httpMocks.createRequest({
        method: 'GET',
        url: '/user',
      });
      var response = httpMocks.createResponse();
      userController.retrieveAll(request, response, function(err, data) {
        expect(data.length).to.equal(5);
        done();
      });

    });
  });
});
