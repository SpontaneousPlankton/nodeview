import { createStore } from 'redux';
import Reducers from './reducers';

// Redux Setup
const defaultState = {
  ui: {
    currentCategory: 'SERVER',
  },
  routers: [],
  form: {},
};

export default createStore(Reducers, defaultState, window.devToolsExtension ? window.devToolsExtension() : f => f);
