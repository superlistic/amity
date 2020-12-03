import React, { useState } from 'react';
import { connect } from 'react-redux';
import { motion } from 'framer-motion';

import './ConnectionLobby.css';
import { AccentButton } from '../../../components/button';
import { WideAccentOutlinedButton } from '../../../components/button';
import {
  acceptConnection,
  denyConnection,
  searchState,
} from '../../../actions/connection';

const ConnectionLobby = ({
  isConnected,
  acceptConnection,
  denyConnection,
  socket,
  user,
  loading,
  stateSocket,
  friendData,
  isSearching,
  searchState,
}) => {
  // const [useState
  const findConnection = () => {
    searchState(true);

    if (!stateSocket) {
      socket.emit('instantConnection');
    } else {
      stateSocket.emit('instantConnection');
    }
  };

  const stopSearch = () => {
    searchState(false);
  };

  if (loading) return <p>Loading..</p>;
  if (isSearching)
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        exit={{ opacity: 0 }}
        className="connection-lobby"
      >
        <p>Searching for an e-meet..</p>
        <WideAccentOutlinedButton onClick={stopSearch}>
          Stop
        </WideAccentOutlinedButton>
      </motion.div>
    );
  return isConnected ? (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      exit={{ opacity: 0 }}
      className="connection-lobby"
    >
      <p className="connection-lobby__text">
        {`You have a connection with ${friendData.username}!`}
      </p>
      <div className="connection-lobby__connected">
        <AccentButton onClick={acceptConnection}>Join now</AccentButton>
        <WideAccentOutlinedButton to={'/schedule'}>
          Reschedule
        </WideAccentOutlinedButton>
      </div>
      <div className="connection-lobby__friend">
        <img
          src={friendData.avatar}
          alt={friendData.avatar}
          className="connection-lobby__avatar"
        ></img>
        <p className="connection-lobby__title">{friendData.username}</p>
        {friendData.tagline && (
          <p className="connection-lobby__bio">{`Tagline: ${friendData.tagline}`}</p>
        )}
        {friendData.bio && (
          <p className="connection-lobby__bio">{`Bio: ${friendData.bio}`}</p>
        )}
      </div>
    </motion.div>
  ) : (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      exit={{ opacity: 0 }}
      className="connection-lobby"
    >
      <p className="settings__title">{`Hi there ${user.username}.`}</p>
      <p className="connection-lobby__text">What do you want to do?</p>

      <section className="connection-lobby__info">
        <div className="connection-lobby__actions">
          <AccentButton onClick={findConnection}>
            Search for an instant connection
          </AccentButton>
          <p className="connection-lobby__banner-text">
            Chat with one of your awesome colleagues directly. We will randomly
            pick a colleague that is available right now.
          </p>
        </div>
        <div className="connection-lobby__actions">
          <WideAccentOutlinedButton to={'/schedule'}>
            Schedule your available time
          </WideAccentOutlinedButton>
          <p className="connection-lobby__banner-text">
            Meet new friends within your company, discuss your daily lives or
            exchange We will match you on random with an available colleague.
          </p>
        </div>
      </section>
      <p className="connection-lobby__help">
        Need help or have some feedback to give us? Click here!
      </p>
    </motion.div>
  );
};
const mapStateToProps = state => ({
  isConnected: state.connection.isConnected,
  user: state.auth.user,
  loading: state.auth.loading,
  stateSocket: state.connection.stateSocket,
  friendData: state.connection.friendData,
  isSearching: state.connection.isSearching,
});

export default connect(mapStateToProps, {
  acceptConnection,
  denyConnection,
  searchState,
})(ConnectionLobby);

// <p>
//   We match you on random, and try to make sure that your commonalities are
//   suggested as topics.
// </p>;

// <p className="connection-lobby__text">
//   Choose an alternative below if you want to chat with one of your awesome
//   colleagues. Check if someone is available right now or schedule a date and
//   time that works for you.
// </p>;
