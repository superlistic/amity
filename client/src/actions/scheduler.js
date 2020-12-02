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

export const getSchedule = payload => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
};
export const addToSchedule = payload => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
};
