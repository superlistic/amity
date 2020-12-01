import React from 'react';
import { connect } from 'react-redux';

import './ConnectionLobby.css';
import { AccentButton } from '../../../components/button';
import { WideAccentOutlinedButton } from '../../../components/button';
import { acceptConnection, denyConnection } from '../../../actions/connection';

const ConnectionLobby = ({
  isConnected,
  acceptConnection,
  denyConnection,
  socket,
  user,
  loading,
}) => {
  const findConnection = () => {
    console.log(socket);
    socket.emit('instantConnection');
  };

  if (loading) return <p>Loading..</p>;
  return isConnected ? (
    <div className="connection-lobby">
      <p className="connection-lobby__text">
        You have a connection with {'Johan'}!
      </p>
      <AccentButton onClick={acceptConnection}>Join</AccentButton>
      <WideAccentOutlinedButton onClick={denyConnection}>
        Deny
      </WideAccentOutlinedButton>
    </div>
  ) : (
    <div className="connection-lobby">
      <p className="settings__title">{`Hi there ${user.username}`}</p>
      <p className="connection-lobby__text">
        You dont have a connection right now.
      </p>

      <div className="connection-lobby__actions">
        <AccentButton onClick={findConnection}>
          Search for a instant connection
        </AccentButton>
        <WideAccentOutlinedButton to={'/schedule'}>
          Schedule your available time
        </WideAccentOutlinedButton>
      </div>
      <p className="connection-lobby__text">
        Meet new friends within your company, discuss your daily lives or
        exchange We will match you on random with an available colleague.
      </p>
    </div>
  );
};
const mapStateToProps = state => ({
  isConnected: state.connection.isConnected,
  user: state.auth.user,
  loading: state.auth.loading,
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
