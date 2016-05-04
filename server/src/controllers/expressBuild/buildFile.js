import { buildMainFile } from './buildMainFile.js';

export function buildFile(fileConfig, userConfig) {
  // build main server file
  if (fileConfig.type === 'main') { return buildMainFile(fileConfig, userConfig); }
  return new Error('Undefined file type');
}
