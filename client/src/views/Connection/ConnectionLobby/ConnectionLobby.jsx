import React from 'react';
import { connect } from 'react-redux';

import './ConnectionLobby.css';
import { AccentButton } from '../../../components/button';
import {
  setConnectionEstablished,
  acceptConnection,
  denyConnection,
} from '../../../actions/connection';

const ConnectionLobby = ({
  setConnectionEstablished,
  isConnected,
  acceptConnection,
  denyConnection,
}) => {
  return isConnected ? (
    <div className="connection-lobby">
      <p>You have a connection with {'Johan'}!</p>
      <AccentButton onClick={acceptConnection}>Join</AccentButton>
      <AccentButton onClick={denyConnection}>Deny</AccentButton>
    </div>
  ) : (
    <div className="connection-lobby">
      <p>You dont have a connection right now.</p>
      <AccentButton>Search for a instant connection</AccentButton>
      <AccentButton>Schedule your available time</AccentButton>
    </div>
  );
};
const mapStateToProps = state => ({
  isConnected: state.connection.isConnected,
});

export default connect(mapStateToProps, {
  setConnectionEstablished,
  acceptConnection,
  denyConnection,
})(ConnectionLobby);
