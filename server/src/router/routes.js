import githubAuth from './../passport/githubAuth';
import { generateFiles } from '../controllers/generateServer';
import { createOne, getConfigs, deleteConfig } from '../controllers/configController';

import { getUser } from './../controllers/userController';

module.exports = (app, express) => {
  app.use(express.static(`${__dirname}/../../../../client`));

  app.get('/auth/github', githubAuth.handleLogin);

  app.get('/auth/github/callback', githubAuth.authenticateLogin, (req, res) => {
    // console.log(req.user); // User data and JWT token
    // user profile picture:
    res.cookie('avatar', req.user._json.avatar_url);
    // user plan:
    res.cookie('plan', req.user._json.plan.name);

    res.cookie('email', req.user._json.email);
    res.cookie('user', req.user._json.login);
    res.cookie('logged_in', true);
    res.cookie('user_session', req.user.token);
    res.cookie('id', req.user.id);
    res.redirect('/#/design');
  });

  app.get('/api/users', getUser);
  app.get('/api/config', getConfigs);
  app.delete('/api/config', deleteConfig);

  app.post('/api//config', createOne);
  app.post('/api/serve', generateFiles);
};

