import { combineReducers } from 'redux';
import alert from './alert';
import admin from './admin';

export default combineReducers({
  alert,
  admin,
});
