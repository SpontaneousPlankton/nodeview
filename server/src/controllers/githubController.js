import request from 'request';

export function createRepo(options) {
  if (!options) {
    throw new Error('Error: Options required for repo creation.');
  }

  const repoOptions = {
    method: 'POST',
    url: 'https://api.github.com/user/repos',
    headers: {
      'user-agent': 'AppButler',
      'cache-control': 'no-cache',
      'content-type': 'application/json',
      authorization: 'token cbe36bee52b94370ba007fa1837841d4d23c1c42',
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
  const fileName = overrideName || settings.name;
  const encodedFile = new Buffer(file).toString('base64');

  const options = {
    method: 'PUT',
    url: `https://api.github.com/repos/${userInfo.user}/${settings.appName}/contents/${fileName}.js`,
    headers: {
      authorization: 'token cbe36bee52b94370ba007fa1837841d4d23c1c42',
      'content-type': 'application/json',
      'cache-control': 'no-cache',
      'user-agent': 'AppButler',
    },
    body: JSON.stringify({
      message: 'Initial Commit',
      content: encodedFile,
      committer: {
        name: userInfo.user,
        email: userInfo.email,
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
