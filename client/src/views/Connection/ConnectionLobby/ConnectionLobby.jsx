import React from 'react';
import { connect } from 'react-redux';

import './ConnectionLobby.css';
import { AccentButton } from '../../../components/button';
import { WideAccentOutlinedButton } from '../../../components/button';
import { acceptConnection, denyConnection } from '../../../actions/connection';
import Profile from '../Profile/Profile';

const ConnectionLobby = ({
  isConnected,
  acceptConnection,
  denyConnection,
  socket,
  user,
  loading,
  stateSocket,
  friendData,
}) => {
  console.log(friendData);
  console.log(socket);
  console.log(stateSocket);
  const findConnection = () => {
    console.log(socket);
    if (!stateSocket) {
      console.log('stateSocket SATAN');
      socket.emit('instantConnection');
    } else {
      console.log(stateSocket);
      stateSocket.emit('instantConnection');
    }
  };

  if (loading) return <p>Loading..</p>;
  return isConnected ? (
    <div className="connection-lobby">
      <p className="connection-lobby__text">
        {`You have a connection with ${friendData.username}!`}
      </p>
      <div className="connection-lobby__actions">
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
        <p className="connection-lobby__bio">{`Tagline: ${friendData.tagline}`}</p>
        {friendData.bio ? (
          <p className="connection-lobby__bio">{`Bio: ${friendData.bio}`}</p>
        ) : (
          ''
        )}
      </div>
    </div>
  ) : (
    <div className="connection-lobby">
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
    </div>
  );
};
const mapStateToProps = state => ({
  isConnected: state.connection.isConnected,
  user: state.auth.user,
  loading: state.auth.loading,
  stateSocket: state.connection.stateSocket,
  friendData: state.connection.friendData,
});

export default connect(mapStateToProps, {
  acceptConnection,
  denyConnection,
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
