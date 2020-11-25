import {
  LOGIN_SUCCESS,
  LOGIN_ERROR,
  LOGGED_OUT,
  AUTH_USER,
} from '../actions/types';

// token:
const initState = {
  authenticated: '',
  isAuthenticated: true,
  loading: false,
  user: null,
  errorMessage: '',
};

export default function auth(state = initState, action) {
  // console.log(state, action);
  const { type, payload } = action;
  switch (type) {
    case LOGIN_SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        user: payload,
      };

    case LOGIN_ERROR:
      return {
        ...state,
        isAuthenticated: false,
        loading: false,
        user: null,
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

    default:
      return state;
  }
}
