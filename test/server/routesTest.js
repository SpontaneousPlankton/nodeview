const chai = require('chai');
chai.should();
const expect = require('chai').expect;
const { it } = require('arrow-mocha/es5');
const supertest = require('supertest');

/* Set up */
import express from 'express';
import bodyParser from 'body-parser';
import session from 'express-session';
import { port } from '../../server/src/config.js';
import { generateServer } from '../../server/build/controllers/generateServer';

const server = express();

server.use(session({
  secret: 'plankton',
  resave: false,
  saveUninitialized: true,
}));

server.use(bodyParser.json());
server.post('/config', generateServer);

const runningServer = server.listen(port, () => {
  console.log(`The server is running at http://localhost:${port}`);
});

/* Tests */

describe('Routes', () => {
  describe('Generating files', () => {
    it('Should return error, when the request has no body', (done) => {
      supertest(server)
      .post('/config')
      .expect(400)
      .end((err, res) => {
        if (err) { done(); }
      });
    });
    it('Should return the constructed files to the user', (done) => {
      const requestBody = {
        data: {
          serverType: 'node-express',
          serverSettings: {
            port: 8000,
            expressName: 'app',
          },
        },
      };
      supertest(server)
      .post('/config')
      .send(requestBody)
      .end((err, res) => {
        expect(res.text.indexOf('require (\'express\')')).to.be.above(-1);
        done();
      });
    });
  });
});

/* Clean up */
runningServer.close();
