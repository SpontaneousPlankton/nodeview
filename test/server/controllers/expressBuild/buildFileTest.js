const chai = require('chai');
chai.should();
const expect = require('chai').expect;
const { it } = require('arrow-mocha/es5');
import httpMocks from 'node-mocks-http';

import { buildFile, buildAllFiles } from '../../../../server/build/controllers/expressBuild/buildFiles.js';

describe('File Builder', () => {
  const fileConfig = {
    type: 'main',
    name: 'server.js',
  };
  const userConfig = {
    serverType: 'node-express',
    appName: 'ACoolApp',
    serverSettings: {
      port: 3000,
      expressName: 'app',
    },
  };
    const request = httpMocks.createRequest({
      method: 'POST',
      url: '/config',
      body: {
        data: {
          serverType: 'node-express',
          serverSettings: {
            port: 8000,
            expressName: 'app',
          },
        },
      },
      session: {
        files: {
          serverJS: {
            type: 'main',
            name: 'server.js',
          },
        },
      },
    });
  describe('Build All files', () => {
    it('should build all files and save them to an array', () => {
      const response = httpMocks.createResponse();
      expect(buildAllFiles(request, response)).to.contain('var app = require (\'express\');\napp.listen(8000, function () {console.log(\'myApp listening on port 8000\');');
    });
  });
  it('should call not return an error when building the main server file', () => {
    expect(buildFile(fileConfig, userConfig)).to.not.be.an('error');
  });

  describe('Creation of the main server file', () => {
    it('should return a string', () => {
      expect(buildFile(fileConfig, userConfig)).to.be.a('string');
    });

    it('contains code that tells the server to listen', () => {
      const str = 'app.listen(3000, function () {console.log(\'ACoolApp listening on port 3000\')';
      expect(buildFile(fileConfig, userConfig).indexOf(str)).to.be.above(-1);
    });

    it('contains code that instantiates express', () => {
      const str = 'var app = require (\'express\');';
      expect(buildFile(fileConfig, userConfig).indexOf(str)).to.be.above(-1);
    });

    it('defaults to port 3000 when no port is provided', () => {
      const newUserConfig = {
        serverType: 'node-express',
        appName: 'ACoolApp',
        serverSettings: {
          port: 8000,
          expressName: 'app',
        },
      };
      const str = 'app.listen(8000, function () {console.log(\'ACoolApp listening on port 8000\')';
      expect(buildFile(fileConfig, newUserConfig).indexOf(str)).to.be.above(-1);
    });

    it('adds middleware code to the file if provided');
  });
});
