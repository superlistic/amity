import React from 'react';
import { connect } from 'react-redux';

import './Controller.css';
import { toggleVideo } from '../../../../actions/connection';

const Controller = ({
  disconnectConnection,
  toggleVideo,
  isVideo,
  removeSharingVideo,
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
    if (!isVideo) {
      toggleVideo(true);
    } else {
      toggleVideo(false);
      removeSharingVideo();
      //stop sending track to other user.
    }
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
          {!isVideo ? 'videocam' : 'videocam_off'}
        </span>
        <span
          className="material-icons controller__icon"
          onClick={disconnectConnection}
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

export default connect(mapStateToProps, {
  toggleVideo,
})(Controller);
