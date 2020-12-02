import React from 'react';
import { connect } from 'react-redux';

import './Controller.css';
import { toggleVideo, disableVideo } from '../../../../actions/connection';

const Controller = ({
  disconnectConnection,
  toggleVideo,
  disableVideo,
  isVideo,
}) => {
  const onChat = () => {
    //get chat component instead of video?
    console.log('Chat icon clicked!');
    toggleVideo(!isVideo);
  };
  const onVolumeOff = () => {
    //mute video component
    console.log('volume_off!');
  };
  const onVideo = () => {
    //get video component, ask the other user to start?
    console.log('Video icon clicked!');
    toggleVideo(!isVideo);
  };
  const onExitChat = () => {
    console.log('ExitChat icon clicked!');
    disconnectConnection();
  };

  return (
    <div className="controller">
      <div className="controller__icons">
        <span
          className="material-icons controller__icon"
          onClick={() => onChat()}
        >
          chat_bubble
        </span>
        <span
          className="material-icons controller__icon"
          onClick={() => onVolumeOff()}
        >
          volume_off
        </span>
        <span
          className="material-icons controller__icon"
          onClick={() => onVideo()}
        >
          videocam
        </span>
        <span
          className="material-icons controller__icon"
          onClick={() => onExitChat()}
        >
          exit_to_app
        </span>
      </div>
    </div>
  );
};

const mapStateToProps = state => ({
  isConnected: state.connection.isConnected,
  isVideo: state.connection.isVideo,
});

//connect to redux, Get name/profile of other person in connection.
export default connect(mapStateToProps, {
  toggleVideo,
  // disableVideo,
})(Controller);
