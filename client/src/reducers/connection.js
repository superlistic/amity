import {
  CONNECTION_ESTABLISHED,
  CONNECTION_ENDED,
  RECEIVED_MESSAGE,
  SENT_MESSAGE,
  TOGGLE_VIDEO,
  ENABLE_AUDIO,
  DISABLE_AUDIO,
  ENABLE_SOUND,
  DISABLE_SOUND,
} from '../actions/types';

const initState = {
  isConnected: true,
  messages: [],
  isVideo: false,
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
        messages: [],
      };
    case SENT_MESSAGE:
    case RECEIVED_MESSAGE:
      return {
        ...state,
        messages: [...state.messages, payload],
      };
    case TOGGLE_VIDEO:
      return {
        ...state,
        isVideo: payload,
      };

    default:
      return state;
  }
}
