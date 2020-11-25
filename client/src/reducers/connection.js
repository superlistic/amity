import { CONNECTION_ESTABLISHED, CONNECTION_ENDED } from '../actions/types';

const initState = {
  isConnected: true,
  data: {},
};

export default function connection(state = initState, action) {
  const { type, payload } = action;
  switch (type) {
    case CONNECTION_ESTABLISHED:
      return {
        ...state,
        isConnected: true,
      };
    case CONNECTION_ENDED:
      return {
        ...state,
        isConnected: false,
      };

    default:
      return state;
  }
}
