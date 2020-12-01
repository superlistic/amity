import sha512 from 'crypto-js/sha512';
import {
  LOGIN_SUCCESS,
  LOGIN_ERROR,
  LOGOUT_SUCCESS,
  AUTH_USER,
  AUTH_ERROR,
  AUTH_CHECK,
  CONNECTION_ENDED,
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
    //AFTER MERGED WITH BE
    // change hash to password as below
    // const password = sha512(email + password).toString();
    // const body = JSON.stringify({ email, password });
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
  //skicka info till BE?
  //Samt se till så att connection avslutas om det finns.
  dispatch({
    type: LOGOUT_SUCCESS,
  });
  //Behöver ändras till att verkligen stänga ned WebRTC connection, men ska förstå hur jag kan göra det på bästa sätt från sibling components först.
  dispatch({
    type: CONNECTION_ENDED,
  });
};

export const checkAuth = () => async dispatch => {
  //api req GET and store response/user in state ;)
  // dispatch({
  //   type: AUTH_CHECK,
  //   payload: { user: null, isAuthenticated: false },
  // });
  try {
    const res = await axios.get('/api/login');
    dispatch({
      type: AUTH_CHECK,
      payload: res,
      //Ändra sen när vi får user
      // payload: { user: null, isAuthenticated: true },
    });
  } catch (e) {
    console.log(e);
  }
};
