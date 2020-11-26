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
} from './types';

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
