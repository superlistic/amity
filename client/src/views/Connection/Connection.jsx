import React, { useEffect, useRef } from 'react';
import io from 'socket.io-client';
import { connect } from 'react-redux';

import './Connection.css';
import Sidebar from '../Sidebar/Sidebar';
import ConnectionLobby from './ConnectionLobby/ConnectionLobby';
import Chat from './Chat/Chat';
import Video from './Video/Video';
import Helpbar from './Helpbar/Helpbar';
import {
  messageReceived,
  messageSent,
  endConnection,
  joinConnection,
} from '../../actions/connection';
let socket;
const Connection = ({
  isConnected,
  userID,
  messageReceived,
  messageSent,
  endConnection,
  joinConnection,
  isVideo,
}) => {
  const peerRef = useRef();
  const messageRef = useRef();
  const otherMessageRef = useRef();
  // const localVideo = useRef();
  // const videoRef = useRef();
  // const otherVideoRef = useRef();

  const createPeer = () => {
    console.log('2.createPeer invoked');
    const config = {
      iceServers: [
        {
          urls: ['stun:stun.l.google.com:19302'],
        },
        {
          urls: 'turn:numb.viagenie.ca',
          credential: 'muazkh',
          username: 'webrtc@live.com',
        },
      ],
    };

    const peer = new RTCPeerConnection(config);
    peer.onicecandidate = handleICECandidateEvent;
    peer.ondatachannel = handleDataChannelEvent;
    peerRef.current = peer;
  };

  const createChannel = () => {
    console.log('Create CHANNEL');
    messageRef.current = peerRef.current.createDataChannel('messageRef');
    messageRef.current.onopen = e => console.log('open!!!!');
    messageRef.current.onmessage = e =>
      console.log('messsage received!!!' + e.data);
    messageRef.current.onclose = e => console.log('closed!!!!!!');
  };

  const handleOffer = async sdp => {
    console.log('handleOffer');
    const description = new RTCSessionDescription(sdp);
    await peerRef.current.setRemoteDescription(description);
    messageRef.current = peerRef.current.createDataChannel('otherMessageRef');
    const answer = await peerRef.current.createAnswer();
    peerRef.current.setLocalDescription(answer);
    socket.emit('relay', { data: answer, type: 'answer' });
  };

  const handleAnswer = async sdp => {
    console.log('handleAnswer');
    const description = new RTCSessionDescription(sdp);
    console.log(sdp);
    console.log(description);
    // if (description.candidate !== null) {
    await peerRef.current.setRemoteDescription(description);
    // }
  };

  const handleCandidate = data => {
    console.log('handleCandidate, ICE FOUND?');
    const candidate = new RTCIceCandidate(data);
    peerRef.current.addIceCandidate(candidate);
  };

  const handleNegotiationNeededEvent = async () => {
    console.log('5.handleNegotiationNeededEvent');
    const offer = await peerRef.current.createOffer();
    await peerRef.current.setLocalDescription(offer);
    const localDescription = peerRef.current.localDescription;
    socket.emit('relay', { data: localDescription, type: 'offer' });
  };

  const handleICECandidateEvent = e => {
    console.log('3.handleICECandidateEvent');
    const { candidate } = e;
    if (candidate) {
      socket.emit('relay', { data: candidate, type: 'candidate' });
    }
  };

  const sendMessage = message => {
    messageRef.current.send(message);
    messageSent({ message: message, client: true, date: Date.now() });
  };

  const handleDataChannelEvent = e => {
    console.log('4.handleDataChannelEvent');
    otherMessageRef.current = e.channel;
    otherMessageRef.current.onopen = e => {
      console.log('WebRTC DC: open.');
      joinConnection();
    };
    otherMessageRef.current.onmessage = e => {
      const messageFromConnection = e.data.toString();
      console.log('WebRTC DC: message received');
      messageReceived({
        message: messageFromConnection,
        client: false,
        date: Date.now(),
      });
    };
    otherMessageRef.current.onclose = e => {
      console.log('WebRTC DC: closed');
      endConnection();
    };
  };

  useEffect(() => {
    // socket = io('ws://localhost:3001');
    socket = io();
    socket.emit('ready');

    socket.on('matchUpdate', payload => {
      console.log(payload);
    });

    socket.on('makeOffer', async () => {
      console.log('1.makeOffer');
      await createPeer();
      await createChannel();
      handleNegotiationNeededEvent();
    });

    socket.on('awaitOffer', () => {
      console.log('1.awaitOffer');
      createPeer();
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

  return isConnected ? (
    <div className="connection">
      <Sidebar />
      {!isVideo ? <Chat sendMessage={sendMessage} /> : <Video />}
      <Helpbar sendMessage={sendMessage} />
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
  isVideo: state.connection.isVideo,
});

export default connect(mapStateToProps, {
  messageReceived,
  messageSent,
  endConnection,
  joinConnection,
})(Connection);
