import { combineReducers } from 'redux';
import auth from './auth';
import connection from './connection';

export default combineReducers({
  auth,
  connection,
});
