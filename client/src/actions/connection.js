import { CONNECTION_ESTABLISHED, CONNECTION_ENDED } from './types';

export const joinConnection = () => dispatch => {
  dispatch({
    type: CONNECTION_ESTABLISHED,
    //   payload: id,
  });
};
export const endConnection = () => dispatch => {
  dispatch({
    type: CONNECTION_ENDED,
    //   payload: id,
  });
};
