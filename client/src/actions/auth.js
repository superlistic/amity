import { LOGGED_IN, LOGGED_OUT } from './types';

export const loggedIn = () => dispatch => {
  dispatch({
    type: LOGGED_IN,
    //   payload: id,
  });
};
