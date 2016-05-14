import { buildMainFile } from './buildMainFile.js';
import { buildRouterFile } from './buildRouterFile.js';

export function buildFile(fileConfig, userConfig) {
  // fileConfig: files to be generated specified in request.session.files
  // userConfig: all of the configuration in the request.body.data
  // build main server file
  if (fileConfig.type === 'main') {
    return buildMainFile(fileConfig, userConfig);
  } else if (fileConfig.type === 'router') {
    const files = [];
    userConfig.routers.forEach((router) => {
      files.push(buildRouterFile(fileConfig, router));
    });
    return files;
  }
  return new Error('Undefined file type');
}

export function buildAllFiles(req, res) {
  const files = [];
  if (!req.session.files) {
    return res.status(400).json(new Error('Req.session.files not defined'));
  }

  for (const fileName in req.session.files) {
    if (fileName) {
      files.push(buildFile(req.session.files[fileName], req.body.data));
      // Code below puts all files in one array
      // const result = buildFile(req.session.files[fileName], req.body.data);
      // if (Array.isArray(result)) {
      //   result.forEach(file => {
      //     files.push(file);
      //   });
      // } else {
      //   files.push(result);
      // }
    }
  }

  return files;
}
