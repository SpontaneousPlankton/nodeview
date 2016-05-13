export function buildRouterFile(endPoint, method, action) {
  let fileString = '';
  fileString += `require(\'express\').Router().${method}(${endPoint}, ${action});`;
  return fileString;
}
