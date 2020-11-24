import { LOGGED_IN, LOGGED_OUT, AUTH_USER } from '../actions/types';

const initState = {
  // token: localStorage.getItem('token'),
  authenticated: '',
  isAuthenticated: null,
  loading: true,
  user: null,
  errorMessage: '',
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
    case AUTH_USER:
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
