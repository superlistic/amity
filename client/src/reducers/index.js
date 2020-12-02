import { combineReducers } from 'redux';
import auth from './auth';
import connection from './connection';
import scheduler from './scheduler';

export default combineReducers({
  auth,
  connection,
  scheduler,
});
