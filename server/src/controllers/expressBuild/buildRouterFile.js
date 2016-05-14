const initializeRouter = () => 'var router = require(\'express\').Router();\n\n';

const generatePaths = (startPoint, endpoints) => {
  let fileString = '';
  endpoints.forEach(end => {
    fileString += `\nrouter.get(${startPoint}${end.endpoint}, function(req, res) {\n\tres.send('Path: ${startPoint}${end.endpoint}');\n};\n`;
  });
  return fileString;
};

export function buildRouterFile(fileConfig, routerConfig) {
  let file = '';
  const startPoint = (routerConfig.startPoint[routerConfig.startPoint.length - 1] === '/') ? routerConfig.startPoint : (routerConfig.startPoint += '/');

  const endpoints = routerConfig.endpoints;

  // Require and initialize express.Router:
  file += initializeRouter();
  // Instructions for user:
  file += `// Change API methods and endpoint methods to fit your needs\n`;
  // generate paths:
  file += generatePaths(startPoint, endpoints);

  // file += `require(\'express\').Router().${method}(${endPoint}, ${action});`;
  return file;
}
