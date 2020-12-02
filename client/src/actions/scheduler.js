import { GET_SCHEDULE, PUT_SCHEDULE, SCHEDULE_ERROR } from './types';
const axios = require('axios');

export const getSchedule = () => async dispatch => {
  try {
    const res = await axios.get('/api/meetings');
    dispatch({
      type: GET_SCHEDULE,
      payload: res,
    });
  } catch (e) {
    dispatch({
      type: SCHEDULE_ERROR,
      payload: 'FRÅN GET',
    });
  }
};

export const addToSchedule = payload => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  try {
    const res = await axios.post('/api/meetings', payload, config);
    dispatch({
      type: PUT_SCHEDULE,
      payload: res,
    });
  } catch (e) {
    dispatch({
      type: SCHEDULE_ERROR,
      payload: 'FRÅN POST',
    });
  }
};
