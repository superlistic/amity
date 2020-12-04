import {
  CONNECTION_ESTABLISHED,
  CONNECTION_ENDED,
  RECEIVED_MESSAGE,
  SENT_MESSAGE,
  ENABLE_VIDEO,
  DISABLE_VIDEO,
  TOGGLE_VIDEO,
  SET_SUGGESTION,
  CLICKED_SUGGESTION,
  ACCEPT_COMMUNICATION,
  DENY_COMMUNICATION,
  OTHER_VIDEO,
  FRIEND_DATA,
  SET_SOCKET,
  SEARCH_STATE,
  FRIEND_DISCONNECTED,
} from './types';

//Connection
export const setConnectionEstablished = () => dispatch => {
  dispatch({
    type: CONNECTION_ESTABLISHED,
  });
};
export const setConnectionEnded = () => dispatch => {
  //Send socket message to BE that connection is ended? For new matches and so forth :)
  dispatch({
    type: CONNECTION_ENDED,
  });
};
export const acceptConnection = () => dispatch => {
  dispatch({
    type: ACCEPT_COMMUNICATION,
  });
};
//Send socket message to BE that connection is denied? For new matches and so forth :)
export const denyConnection = () => dispatch => {
  dispatch({
    type: DENY_COMMUNICATION,
  });
};
export const setSocket = payload => dispatch => {
  dispatch({
    type: SET_SOCKET,
    payload,
  });
};
export const setFriendData = payload => dispatch => {
  dispatch({
    type: FRIEND_DATA,
    payload,
  });
};
export const searchState = payload => dispatch => {
  dispatch({
    type: SEARCH_STATE,
    payload,
  });
};
export const friendDisconnected = () => dispatch => {
  dispatch({
    type: FRIEND_DISCONNECTED,
  });
};

//Message
export const messageReceived = payload => dispatch => {
  dispatch({
    type: RECEIVED_MESSAGE,
    payload,
  });
};

export const messageSent = payload => dispatch => {
  dispatch({
    type: SENT_MESSAGE,
    payload,
  });
};

//Suggestions
export const setSuggestion = payload => dispatch => {
  dispatch({
    type: SET_SUGGESTION,
    payload,
  });
};
export const clickedSuggestion = () => dispatch => {
  dispatch({
    type: CLICKED_SUGGESTION,
  });
};

//Video
export const toggleVideo = payload => dispatch => {
  dispatch({
    type: TOGGLE_VIDEO,
    payload,
  });
};
export const disableVideo = payload => dispatch => {
  dispatch({
    type: DISABLE_VIDEO,
  });
};
export const handleOtherVideo = payload => dispatch => {
  dispatch({
    type: OTHER_VIDEO,
    payload,
  });
};
