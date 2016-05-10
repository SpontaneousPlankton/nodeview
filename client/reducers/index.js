import { combineReducers } from 'redux';
import ui from './ui.js';
import routers from './routers.js';
import { reducer as form } from 'redux-form';

export default combineReducers({
  ui,
  routers,
  form,
});
