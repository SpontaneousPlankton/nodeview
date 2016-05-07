import { combineReducers } from 'redux';
import ui from './ui.js';
import routers from './routers.js';

export default combineReducers({
  ui,
  routers,
});
