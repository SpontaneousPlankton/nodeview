import React from 'react';
import { render } from 'react-dom';
import { Router, Route, hashHistory } from 'react-router';
import { Provider } from 'react-redux';


// Components
import Index from './components/Index.js';
import Design from './components/Design.js';
import NoMatch from './components/NoMatch.js';

import Store from './store.js';

render((
  <Provider store={Store}>
    <Router history={hashHistory}>
      <Route path="/" component={Index} />
      <Route path="/design" component={Design} />
      <Route path="/*" component={NoMatch} />
    </Router>
  </Provider>
), document.getElementById('app'));
