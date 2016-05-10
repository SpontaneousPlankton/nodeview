import express from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import PrettyError from 'pretty-error';
import { port } from './config.js';
import passport from 'passport';
import routes from './router/routes';
import mongoose from 'mongoose';
import session from 'express-session';
// import browserSync from 'browser-sync';

// import https from 'https';
// import fs from 'fs';
// import LEX from 'letsencrypt-express'; // letsencrypt
// import http from 'http'; // letsencrypt
// import spdy from 'spdy'; // letsencrypt


const server = express();
const router = routes;

mongoose.connect('mongodb://localhost/AppButler');

server.use(session({
  secret: 'plankton',
  resave: false,
  saveUninitialized: true,
}));

const pe = new PrettyError();
pe.start();


server.use(cookieParser()); // FOR DEV, STORE SECRET PROPERLY IN PROD
server.use(express.static(`${__dirname}/../../client`));

server.use(bodyParser.json());
server.use(bodyParser.urlencoded({
  extended: true,
}));

server.use(passport.initialize());
router(server, express);

// server.listen(port, () => {
//   console.log(`The server is running at http://localhost:${port}`);
//   // Listen for the `init` event
//   // browserSync({
//   //   proxy: `localhost:${port}`,
//   //   files: [
//   //     `${__dirname}/../../client/**/*.{js}`,
//   //     {
//   //       match: ['wp-content/themes/**/*.php'],
//   //     },
//   //   ],
//   // });
// });

// ////// STARTSSL /////////// DO NOT DELETE REQUIRED FOR HTTPS
// const privateKey = fs.readFileSync(`${__dirname}/../../dyland.key`);
// const certificate = fs.readFileSync(`${__dirname}/../../server.pem`);

// https.createServer({
//   key: privateKey,
//   cert: certificate,
//   passphrase: 'appbutler',
// }, server).listen(1337, () => {
//   console.log(`Server running at ${port}`);
// });
// /////////////////////////////

// const lex = LEX.testing().create({
//   configDir: `${__dirname}/letsencrypt`,
//   onRequest: server,
//   server: require('letsencrypt').productionServerUrl,
//   approveRegistration: (hostname, cb) => {
//     cb(null, {
//       domains: ['localhost'],
//       email: 'kuangd.usfcaubms@gmail.com',
//       agreeTos: true,
//     });
//   },
// }).listen(
//   // you can give just the port, or expand out to the full options
//   [8000, {
//     port: 8080,
//     address: 'localhost',
//     onListening: () => {
//       console.log('http://localhost');
//     },
//   }],
//   [1337, {
//     port: 8443,
//     address: 'localhost',
//   }], () => {
//     const protocol = ('requestCert' in this) ? 'https' : 'http';
//     console.log(`Listening at ${protocol}://localhost:${this.address().port}`);
//   });
// console.log(lex.plainServers);
// console.log(lex.tlsServers);


server.listen(port, () => {
  console.log(`The server is running at http://localhost:${port}`);
});
