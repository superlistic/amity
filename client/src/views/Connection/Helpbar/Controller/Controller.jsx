import React from 'react';
import { connect } from 'react-redux';

import './Controller.css';
import { endConnection } from '../../../../actions/connection';

const Controller = ({ endConnection, isConnected }) => {
  const onChat = () => {
    console.log('Chat icon clicked!');
  };
  const onVolumeOff = () => {
    console.log('volume_off!');
  };
  const onVideo = () => {
    console.log('Video icon clicked!');
  };
  const onExitChat = () => {
    console.log('ExitChat icon clicked!');
    endConnection();
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
});

//connect to redux, Get name/profile of other person in connection.
export default connect(mapStateToProps, { endConnection })(Controller);
