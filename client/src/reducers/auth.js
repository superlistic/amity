import { LOGGED_IN, LOGGED_OUT, REGISTERED } from '../actions/types';

const initState = {
  // token: localStorage.getItem('token'),
  isAuthenticated: null,
  loading: true,
  user: null,
};

export default function auth(state = initState, action) {
  console.log(state, action);
  const { type, payload } = action;
  switch (type) {
    case LOGGED_IN:
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        user: payload,
      };
    case LOGGED_OUT:
      return {
        ...state,
      };
    case REGISTERED:
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        user: payload,
      };

    default: {
      return state;
    }
  }
}
