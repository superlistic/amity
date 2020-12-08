import React from 'react';
import { connect } from 'react-redux';

import './Helpbar.css';
import FriendProfile from './FriendProfile/FriendProfile';
import Suggestions from './Suggestions/Suggestions';
import Controller from './Controller/Controller';

const Helpbar = ({
  sendMessage,
  disconnectConnection,
  friendData,
  removeSharingVideo,
}) => {
  return (
    <div className="helpbar">
      <p className="helpbar__title">You have connected with..</p>
      <FriendProfile friend={friendData} />
      <Suggestions sendMessage={sendMessage} />
      <Controller
        disconnectConnection={disconnectConnection}
        removeSharingVideo={removeSharingVideo}
      />
    </div>
  );
};

const mapStateToProps = state => ({
  friendData: state.connection.friendData,
});

export default connect(mapStateToProps, {})(Helpbar);
