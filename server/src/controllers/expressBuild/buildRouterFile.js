const initializeRouter = () => 'var router = require(\'express\').Router();\n\n';

const generatePaths = (startPoint, endpoints) => {
  let fileString = '';
  endpoints.forEach(end => {
    let route = `${startPoint}${end.endpoint}`;
    // prevent double '// in path'
    route = route.replace(/\/\//i, '/');
    fileString += `\nrouter.get('${route}', function(req, res) {\n\tres.send('Path: ${route}');\n};\n`;
  });
  return fileString;
};

export function buildRouterFile(fileConfig, routerConfig) {
  let file = '';
  // const startPoint = (routerConfig.startPoint[routerConfig.startPoint.length - 1] === '/') ? routerConfig.startPoint : (routerConfig.startPoint += '/');
  const startPoint = routerConfig.startPoint;

  const endpoints = routerConfig.endpoints;

  // Require and initialize express.Router:
  file += initializeRouter();
  // Instructions for user:
  file += `// Change API methods and endpoint methods to fit your needs\n`;
  // generate paths:
  file += generatePaths(startPoint, endpoints);
  // export:
  file += '\nmodule.exports = router\n';
  return file;
}
