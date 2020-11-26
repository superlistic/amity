import sha512 from 'crypto-js/sha512';
import {
  LOGIN_SUCCESS,
  LOGIN_ERROR,
  LOGOUT_SUCCESS,
  AUTH_USER,
  AUTH_ERROR,
} from './types';
const axios = require('axios');

export const login = payload => async dispatch => {
  const { email, password } = payload;
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  try {
    const hash = sha512(email + password).toString();
    const body = JSON.stringify({ email, hash });
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

export const register = ({ name, email, password }) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  try {
    const body = JSON.stringify({ name, email, password });
    // const res = await axios.post('/api/users', body, config);
    dispatch({
      type: AUTH_USER,
      payload: { name, email, password },
    });
  } catch (err) {
    dispatch({
      type: AUTH_ERROR,
    });
  }
};
export const logOut = () => async dispatch => {
  dispatch({
    type: LOGOUT_SUCCESS,
  });
};
