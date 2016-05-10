import githubAuth from './../passport/githubAuth';
import { generateServer } from '../controllers/generateServer';
import { getUser } from './../models/userController';

module.exports = (app, express) => {
  app.use(express.static(`${__dirname}/../../../../client`));

  app.get('/auth/github', githubAuth.handleLogin);

  app.get('/auth/github/callback', githubAuth.authenticateLogin, (req, res) => {
    // console.log(req.user); // User data and JWT token
    res.cookie('user', req.user._json.login);
    res.cookie('logged_in', true);
    res.cookie('user_session', req.user.token);
    res.cookie('id', req.user.id);
    res.redirect('/');
  });

  app.get('/api/users', getUser);

  app.post('/config', generateServer);
};

