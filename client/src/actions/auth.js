import sha512 from 'crypto-js/sha512';
import {
  LOGIN_SUCCESS,
  LOGIN_ERROR,
  LOGGED_OUT,
  AUTH_USER,
  AUTH_ERROR,
} from './types';
const axios = require('axios');

export const login = payload => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  try {
    const { email, password } = payload;
    // const userID = '119937317331';
    // const password = '123456';
    const hash = sha512(email + hash).toString();
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

    // dispatch(loadUser());
    // dispatch(setAlert('Ny användare skapad!', 'success'));
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
    }
    dispatch({
      type: AUTH_ERROR,
    });
  }
};
