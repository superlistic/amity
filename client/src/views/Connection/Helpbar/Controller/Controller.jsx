import React from 'react';
import './Controller.css';

const Controller = () => {
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
  };

  return (
    <div className="controller">
      <div className="controller__icons">
        <span class="material-icons controller__icon" onClick={() => onChat()}>
          chat_bubble
        </span>
        <span
          class="material-icons controller__icon"
          onClick={() => onVolumeOff()}
        >
          volume_off
        </span>
        <span class="material-icons controller__icon" onClick={() => onVideo()}>
          videocam
        </span>
        <span
          class="material-icons controller__icon"
          onClick={() => onExitChat()}
        >
          exit_to_app
        </span>
      </div>
    </div>
  );
};

//connect to redux, Get name/profile of other person in connection.
export default Controller;
