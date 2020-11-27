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
} from './types';

//Connection
export const joinConnection = () => dispatch => {
  dispatch({
    type: CONNECTION_ESTABLISHED,
    //   payload: id,
  });
};
export const endConnection = () => dispatch => {
  dispatch({
    type: CONNECTION_ENDED,
    //   payload: id,
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
