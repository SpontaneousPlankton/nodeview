// include middleware

// { id: 'df068b36-99c0-4dc8-83a2-9726ba048958',
//     startPoint: '/endpoint',
//     endpoints: [],
//     editingStartPoint: false,
//     editingName: false,
//     name: 'New router' }

// helper function
import { camelize } from '../../utils/utils.js';

// function camelize(str) {
//   return str.replace(/(?:^\w|[A-Z]|\b\w)/g, function(letter, index) {
//     return index == 0 ? letter.toLowerCase() : letter.toUpperCase();
//   }).replace(/\s+/g, '');
// }

/* -------------------------- */

function addExpress() {
  return `var express = require (\'express\');\n\n`;
}

// use imported middleware
function requireRouters(routers) {
  let fileString = '';
  routers.forEach(router => {
    const name = camelize(router.name);
    fileString += `var ${name} = require('./${name}');\n`;
  });
  return fileString;
}

const initializeExpress = () => '\nvar app = express();\n\n';

// var routes = require('./routes/index');
// var users = require('./routes/users');
// app.use('/', routes);
// app.use('/users', users);
function useRouters(routers) {
  let fileString = '';
  routers.forEach(router => {
    const name = camelize(router.name);
    fileString += `app.use(\'${router.startPoint}\', ${name});\n`;
  });
  return fileString;
}

function addServerListen(name, port) {
  return `\napp.listen(${port}, function () {\n\tconsole.log(\'${name} listening on port ${port}\');\n};\n`;
}

export function buildMainFile(fileConfig, userConfig) {
  let file = '';
  const name = userConfig.appName || 'myApp';
  const port = userConfig.serverSettings.port || 8000;
  const routers = userConfig.routers || [];
  // require express
  file += addExpress();
  // require router files
  file += requireRouters(routers);
  // initialize express
  file += initializeExpress();
  // use routers as middleware
  file += useRouters(routers);
  // server listen
  file += addServerListen(name, port);

  return file;
}
