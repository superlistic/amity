import React from 'react';
import { connect } from 'react-redux';

import './ConnectionLobby.css';
import { AccentButton } from '../../../components/button';
import { joinConnection } from '../../../actions/connection';

const ConnectionLobby = ({ joinConnection }) => {
  return (
    <div className="connection-lobby">
      <AccentButton onClick={joinConnection}>Join Connection</AccentButton>
    </div>
  );
};
const mapStateToProps = state => ({
  //state
});

export default connect(mapStateToProps, { joinConnection })(ConnectionLobby);
