import { MATCH_ESTABLISHED, MATCH_DISCONNECTED } from './types';

export const x = () => dispatch => {
  dispatch({
    type: MATCH_ESTABLISHED,
    //   payload: id,
  });
};
