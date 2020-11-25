import { IS_CONNECTED } from '../actions/types';

const initState = {
  userID: null,
  username: '',
  email: '',
  avatar: '',
  bio: '',
  tagline: '',
  settings: {},
  callHistory: [],
};

export default function match(state = initState, action) {
  //   console.log(state, action);
  const { type, payload } = action;
  switch (type) {
    case IS_CONNECTED:
      return {
        ...state,
        isConnected: true,
      };

    default: {
      return state;
    }
  }
}
