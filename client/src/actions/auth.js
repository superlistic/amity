import sha512 from 'crypto-js/sha512';
import {
  LOGIN_SUCCESS,
  LOGIN_ERROR,
  LOGOUT_SUCCESS,
  LOGOUT_ERROR,
  AUTH_USER,
  AUTH_ERROR,
  AUTH_CHECK,
  CONNECTION_ENDED,
} from './types';
const axios = require('axios');

export const login = payload => async dispatch => {
  let { email, password } = payload;
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  try {
    password = sha512(email + password).toString();
    const body = JSON.stringify({ email, password });
    const res = await axios.post('/api/login', body, config);
    dispatch({
      type: LOGIN_SUCCESS,
      payload: res,
    });
  } catch (e) {
    console.log(e);
    dispatch({
      type: LOGIN_ERROR,
    });
  }
};

export const register = ({ username, email, password }) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  try {
    password = sha512(email + password).toString();
    const body = JSON.stringify({ username, email, password });
    const res = await axios.post('/api/register', body, config);
    dispatch({
      type: AUTH_USER,
      payload: res,
    });
  } catch (err) {
    dispatch({
      type: AUTH_ERROR,
    });
  }
};

export const logOut = () => async dispatch => {
  try {
    const res = await axios.get('/api/logout');

    dispatch({
      type: CONNECTION_ENDED,
    });
    dispatch({
      type: LOGOUT_SUCCESS,
      payload: res,
    });
  } catch (err) {
    dispatch({
      type: LOGOUT_ERROR,
    });
  }
};

export const checkAuth = () => async dispatch => {
  try {
    const res = await axios.get('/api/login');
    dispatch({
      type: AUTH_CHECK,
      payload: res,
    });
  } catch (e) {
    dispatch({
      type: AUTH_ERROR,
    });
  }
};
