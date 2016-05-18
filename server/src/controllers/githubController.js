import request from 'request';
import jwt from 'jsonwebtoken';

export function createRepo(options) {
  if (!options) {
    throw new Error('Error: Options required for repo creation.');
  }
  const decoded = jwt.verify(options.cookies.user_session, 'CHANGETHISFORPROD');

  const repoOptions = {
    method: 'POST',
    url: 'https://api.github.com/user/repos',
    headers: {
      'user-agent': 'AppButler',
      'cache-control': 'no-cache',
      'content-type': 'application/json',
      authorization: `token ${decoded.token}`,
    },
    body: {
      name: `${options.appName}`,
    },
    json: true,
  };

  return new Promise((resolve, reject) => {
    request(repoOptions, (err, res) => {
      if (err) {
        reject(err);
      }
      resolve(res);
    });
  });
}

export function createFile(file, settings, userInfo, overrideName) {
  const fileName = overrideName || `${settings.name}.js`;
  const encodedFile = new Buffer(file).toString('base64');
  const decoded = jwt.verify(userInfo.user_session, 'CHANGETHISFORPROD');
  let endpoint = '';

  if (!settings.routers) {
    // for router files:
    endpoint = `https://api.github.com/repos/${userInfo.user}/${settings.appName}/contents/routers/${fileName}`;
  } else {
    endpoint = `https://api.github.com/repos/${userInfo.user}/${settings.appName}/contents/${fileName}`;
  }

  const options = {
    method: 'PUT',
    url: endpoint,
    headers: {
      authorization: `token ${decoded.token}`,
      'content-type': 'application/json',
      'cache-control': 'no-cache',
      'user-agent': 'AppButler',
    },
    body: JSON.stringify({
      message: 'Initial Commit',
      content: encodedFile,
      committer: {
        name: userInfo.user,
        email: decodeURIComponent(userInfo.email),
      },
      json: true,
    }),
  };

  return new Promise((resolve, reject) => {
    request(options, (err, res) => {
      if (err) {
        reject(err);
      }
      resolve(res);
    });
  });
}
