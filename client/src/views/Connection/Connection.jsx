import React, { useEffect, useRef } from 'react';
import io from 'socket.io-client';
import { connect } from 'react-redux';

import './Connection.css';
import Sidebar from '../Sidebar/Sidebar';
import ConnectionLobby from './ConnectionLobby/ConnectionLobby';
import Chat from './Chat/Chat';
import Video from './Video/Video';
import Helpbar from './Helpbar/Helpbar';
import { createPeer } from '../../WebRTC/WebRTC';
import {
  messageReceived,
  messageSent,
  setConnectionEnded,
  setConnectionEstablished,
} from '../../actions/connection';
let socket;
const Connection = ({
  isConnected,
  userID,
  messageReceived,
  messageSent,
  setConnectionEnded,
  setConnectionEstablished,
  isVideo,
  communicationAccepted,
}) => {
  // const socket = io();

  const peerRef = useRef();
  const sendDataChannel = useRef();
  const receiveDataChannel = useRef();
  // const localVideo = useRef();
  // const videoRef = useRef();
  // const otherVideoRef = useRef();

  const createChannel = () => {
    console.log('Create CHANNEL');
    sendDataChannel.current = peerRef.current.createDataChannel(
      'sendDataChannel'
    );
    sendDataChannel.current.onopen = e => console.log('open!!!!');
    sendDataChannel.current.onmessage = e =>
      console.log('messsage received!!!' + e.data);
    sendDataChannel.current.onclose = e => console.log('closed!!!!!!');
  };

  const handleOffer = async sdp => {
    console.log('handleOffer');
    const description = await new RTCSessionDescription(sdp);
    console.log(sdp);
    console.log(peerRef.current);
    await peerRef.current.setRemoteDescription(description);
    console.log(peerRef.current);
    const answer = await peerRef.current.createAnswer();
    peerRef.current.setLocalDescription(answer);
    sendDataChannel.current = peerRef.current.createDataChannel(
      'receiveDataChannel'
    );
    socket.emit('relay', { data: answer, type: 'answer' });
  };

  const handleAnswer = async sdp => {
    console.log('handleAnswer');
    const description = await new RTCSessionDescription(sdp);
    await peerRef.current.setRemoteDescription(description);
  };

  const handleCandidate = data => {
    console.log('ICE FOUND, RTC successful');
    const candidate = new RTCIceCandidate(data);
    peerRef.current.addIceCandidate(candidate);
  };

  const handleNegotiationNeededEvent = async () => {
    const offer = await peerRef.current.createOffer();
    await peerRef.current.setLocalDescription(offer);
    const localDescription = peerRef.current.localDescription;
    socket.emit('relay', { data: localDescription, type: 'offer' });
  };

  const handleICECandidateEvent = e => {
    console.log('handleICECandidateEvent');
    const { candidate } = e;
    if (candidate) {
      socket.emit('relay', { data: candidate, type: 'candidate' });
    }
  };

  const disconnectConnection = () => {
    console.log('disconnectConnection');
    sendDataChannel.current.close();
    receiveDataChannel.current.close();
    peerRef.current.close();

    sendDataChannel.current = null;
    receiveDataChannel.current = null;
    peerRef.current = null;

    console.log(sendDataChannel.current);
    console.log(receiveDataChannel.current);
    console.log(peerRef.current);
  };

  const sendMessage = message => {
    sendDataChannel.current.send(message);
    messageSent({ message: message, client: true, date: Date.now() });
  };

  const handleDataChannelEvent = e => {
    console.log('handleDataChannelEvent');
    receiveDataChannel.current = e.channel;
    receiveDataChannel.current.onopen = e => {
      console.log('WebRTC DC: open.');
      setConnectionEstablished();
    };
    receiveDataChannel.current.onmessage = e => {
      const newMessage = e.data.toString();
      console.log('WebRTC DC: message received');
      messageReceived({
        message: newMessage,
        client: false,
        date: Date.now(),
      });
    };
    receiveDataChannel.current.onclose = e => {
      console.log('WebRTC DC: closed');
      setConnectionEnded();
    };
  };

  useEffect(() => {
    console.log('CONNECTION useEffect');
    socket = io();
    socket.emit('ready');

    socket.on('matchUpdate', payload => {
      console.log(payload);
    });

    socket.on('makeOffer', async () => {
      console.log('User is making an offer');
      peerRef.current = await createPeer(
        handleICECandidateEvent,
        handleDataChannelEvent
      );
      await createChannel();
      handleNegotiationNeededEvent();
    });

    socket.on('awaitOffer', async () => {
      console.log('User waiting for offer');
      // peerRef.current = await createPeer();
      // peerRef.current.onicecandidate = await handleICECandidateEvent;
      // peerRef.current.ondatachannel = await handleDataChannelEvent;
      peerRef.current = await createPeer(
        handleICECandidateEvent,
        handleDataChannelEvent
      );
    });

    socket.on('relay', payload => {
      const { type, data } = payload;
      console.log('relay', payload);
      switch (type) {
        case 'offer':
          return handleOffer(data);
        case 'answer':
          return handleAnswer(data);
        case 'candidate':
          return handleCandidate(data);
        default:
          return 'error';
      }
    });
  }, []);

  // if (isVideo) {
  //   console.log('video tajm');
  //   navigator.mediaDevices
  //     .getUserMedia({ audio: true, video: true })
  //     .then(stream => {
  //       localVideo.current.srcObject = stream;
  //       videoRef.current = stream;
  //     });
  // }

  // Kill video stream
  // stream.getTracks().forEach(track => track.stop());

  return communicationAccepted ? (
    <div className="connection">
      <Sidebar />
      {!isVideo ? <Chat sendMessage={sendMessage} /> : <Video />}
      <Helpbar
        sendMessage={sendMessage}
        disconnectConnection={disconnectConnection}
      />
    </div>
  ) : (
    <div className="connection">
      <Sidebar />
      <ConnectionLobby />
    </div>
  );
};

const mapStateToProps = state => ({
  communicationAccepted: state.connection.communicationAccepted,
  isConnected: state.connection.isConnected,
  isVideo: state.connection.isVideo,
});

export default connect(mapStateToProps, {
  messageReceived,
  messageSent,
  setConnectionEnded,
  setConnectionEstablished,
})(Connection);
