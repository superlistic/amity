import { IS_CONNECTED } from './types';

export const x = () => dispatch => {
  dispatch({
    type: IS_CONNECTED,
    //   payload: id,
  });
};
