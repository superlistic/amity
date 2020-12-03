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
  CLICKED_SUGGESTION,
  ACCEPT_COMMUNICATION,
  DENY_COMMUNICATION,
  OTHER_VIDEO,
  FRIEND_DATA,
  SET_SOCKET,
  SEARCH_STATE,
} from '../actions/types';

const initState = {
  isConnected: false,
  communicationAccepted: false,
  messages: [],
  isVideo: false,
  currentSuggestion: [],
  isOtherVideo: false,
  friendData: {},
  stateSocket: {},
  isSearching: false,
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
        isSearching: false,
      };
    case DENY_COMMUNICATION:
    case CONNECTION_ENDED:
      return {
        ...state,
        isConnected: false,
        communicationAccepted: false,
        isOtherVideo: false,
        messages: [],
        friendData: {},
        stateSocket: {},
        isSearching: false,
      };
    case ACCEPT_COMMUNICATION:
      return {
        ...state,
        communicationAccepted: true,
      };
    case SET_SOCKET:
      return {
        ...state,
        stateSocket: payload,
      };
    case FRIEND_DATA:
      return {
        ...state,
        friendData: payload,
      };
    case SEARCH_STATE:
      return {
        ...state,
        isSearching: payload,
      };

    //Messages
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
    case CLICKED_SUGGESTION:
      return {
        ...state,
        currentSuggestion: [],
      };
    //Video
    case TOGGLE_VIDEO:
      return {
        ...state,
        isVideo: payload,
      };
    case OTHER_VIDEO:
      return {
        ...state,
        isOtherVideo: payload,
      };

    default:
      return state;
  }
}
