import {
  CONNECTION_ESTABLISHED,
  CONNECTION_ENDED,
  RECEIVED_MESSAGE,
  SENT_MESSAGE,
  ENABLE_VIDEO,
  DISABLE_VIDEO,
  TOGGLE_VIDEO,
  ENABLE_AUDIO,
  DISABLE_AUDIO,
  ENABLE_SOUND,
  DISABLE_SOUND,
  SET_SUGGESTION,
  ACCEPT_COMMUNICATION,
  DENY_COMMUNICATION,
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
