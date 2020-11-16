import { LOGGED_IN, LOGGED_OUT } from '../actions/types';

const initState = {};

export default function auth(state = initState, action) {
  console.log(state, action);
  const { type, payload } = action;
  switch (type) {
    case LOGGED_IN:
      return {
        ...state,
      };

    default: {
      return state;
    }
  }
}
