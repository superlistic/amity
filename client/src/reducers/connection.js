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
  SET_SUGGESTION,
} from '../actions/types';

const initState = {
  isConnected: true,
  messages: [],
  isVideo: false,
  currentSuggestion: [],
};

export default function connection(state = initState, action) {
  const { type, payload } = action;
  console.log(type, payload);
  switch (type) {
    //Connection
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
    //Message
    case SENT_MESSAGE:
    case RECEIVED_MESSAGE:
      return {
        ...state,
        messages: [...state.messages, payload],
      };
    //Suggestions
    case SET_SUGGESTION:
      return {
        ...state,
        currentSuggestion: [payload],
      };
    //Video
    case TOGGLE_VIDEO:
      return {
        ...state,
        isVideo: payload,
      };

    default:
      return state;
  }
}
