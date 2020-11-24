import { MATCH_ESTABLISHED, MATCH_DISCONNECTED } from '../actions/types';

const initState = {};

export default function match(state = initState, action) {
  const { type, payload } = action;
  switch (type) {
    case MATCH_ESTABLISHED:
      return {
        ...state,
      };

    default: {
      return state;
    }
  }
}
