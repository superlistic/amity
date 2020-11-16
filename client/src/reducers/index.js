import { combineReducers } from 'redux';
import auth from './auth';
import match from './match';

export default combineReducers({
  auth,
  match,
});
