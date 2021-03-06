import {
  LOGIN_SUCCESS,
  LOGIN_ERROR,
  LOGOUT_SUCCESS,
  AUTH_USER,
  AUTH_CHECK,
  AUTH_ERROR,
  SET_SOCKET,
} from '../actions/types';

const initState = {
  isAuthenticated: false,
  loading: true,
  user: null,
  errorMessage: '',
  stateSocket: {},
};

export default function auth(state = initState, action) {
  const { type, payload } = action;
  switch (type) {
    case LOGIN_SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        user: payload.data.user,
        stateSocket: {},
      };

    case LOGIN_ERROR:
      return {
        ...state,
        isAuthenticated: false,
        loading: false,
        user: null,
        stateSocket: {},
      };
    case LOGOUT_SUCCESS:
      return {
        ...state,
        isAuthenticated: false,
        loading: false,
        user: null,
        stateSocket: {},
      };
    case AUTH_USER:
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        user: payload.data,
      };
    case AUTH_CHECK:
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        user: payload.data.user,
      };
    case AUTH_ERROR:
      return {
        ...state,
        loading: false,
        user: null,
      };
    case SET_SOCKET:
      return {
        ...state,
        stateSocket: payload,
      };

    default:
      return state;
  }
}
