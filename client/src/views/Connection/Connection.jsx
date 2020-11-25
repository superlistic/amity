import React, { useEffect } from 'react';
import io from 'socket.io-client';
import { connect } from 'react-redux';
// import openSocket from 'socket.io-client';

import './Connection.css';
import Sidebar from '../Sidebar/Sidebar';
import ConnectionLobby from './ConnectionLobby/ConnectionLobby';
import Chat from './Chat/Chat';
import Helpbar from './Helpbar/Helpbar';
import { initiateConnection } from '../../webRTC/initiateConnection';
import { answeringConnection } from '../../webRTC/answeringConnection';
// const socket = io('ws://localhost:3000');
const socket = io();

const Connection = ({ isConnected, userID }) => {
  // const userMedia = () => {
  //   navigator.getUserMedia =
  //     navigator.getUserMedia ||
  //     navigator.webkitGetUserMedia ||
  //     navigator.mozGetUserMedia ||
  //     navigator.msGetUserMedia;
  //   return !!navigator.getUserMedia;
  // };

  // if (userMedia()) {
  //   navigator.getUserMedia =
  //     navigator.getUserMedia ||
  //     navigator.webkitGetUserMedia ||
  //     navigator.mozGetUserMedia ||
  //     navigator.msGetUserMedia;
  //   navigator.getUserMedia(
  //     { video: true, audio: true },
  //     function (stream) {
  //       var video = document.querySelector('video');

  //       //insert stream into the video tag
  //       video.src = window.URL.createObjectURL(stream);
  //     },
  //     function (err) {}
  //   );
  // } else {
  //   alert('Error. WebRTC is not supported!');
  // }
  // useEffect(() => {
  //   navigator.mediaDevices
  //     .getUserMedia({ audio: true, video: true })
  //     .then(el => console.log(el));
  // }, []);

  // useEffect(() => {
  //   const peerConnection = new RTCPeerConnection();
  //   const dataChannel = peerConnection.createDataChannel(
  //     'myChannel',
  //     dataChannelOptions
  //   );
  // }, []);

  // RTCPeerConnection.createDataChannel()
  // RTCPeerConnection.close()

  //userID as room
  useEffect(() => {
    socket.on('connect', () => {
      console.log('connected with the server');
      socket.emit('webRTC_connect', 'HEJ');

      //mockdata, should be sent from the server upon signaling?
      const initiator = true;

      const connection = new RTCPeerConnection();
      if (initiator) {
        initiateConnection(connection);
      } else {
        answeringConnection(connection);
      }
    });
  }, []);

  return isConnected ? (
    <div className="connection">
      <Sidebar />
      <Chat />
      <Helpbar />
    </div>
  ) : (
    <div className="connection">
      <Sidebar />
      <ConnectionLobby />
    </div>
  );
};

const mapStateToProps = state => ({
  isConnected: state.connection.isConnected,
});

export default connect(mapStateToProps)(Connection);
