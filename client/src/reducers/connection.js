import {
  CONNECTION_ESTABLISHED,
  CONNECTION_ENDED,
  RECEIVED_MESSAGE,
  SENT_MESSAGE,
  TOGGLE_VIDEO,
  SET_SUGGESTION,
  CLICKED_SUGGESTION,
  ACCEPT_COMMUNICATION,
  DENY_COMMUNICATION,
  OTHER_VIDEO,
  FRIEND_DATA,
  SEARCH_STATE,
  FRIEND_DISCONNECTED,
} from '../actions/types';

const initState = {
  isConnected: false,
  communicationAccepted: false,
  messages: [],
  isVideo: false,
  currentSuggestion: [],
  isOtherVideo: false,
  friendData: {},
  isSearching: false,
};

export default function connection(state = initState, action) {
  const { type, payload } = action;
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
        ...initState,
      };
    case ACCEPT_COMMUNICATION:
      return {
        ...state,
        communicationAccepted: true,
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
    case FRIEND_DISCONNECTED:
      console.log('FRIEND_DISCONNECTED');
      return {
        ...initState,
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
