import React, { useEffect, useRef } from 'react';
import io from 'socket.io-client';
import { connect } from 'react-redux';
// import openSocket from 'socket.io-client';

import './Connection.css';
import Sidebar from '../Sidebar/Sidebar';
import ConnectionLobby from './ConnectionLobby/ConnectionLobby';
import Chat from './Chat/Chat';
import Video from './Video/Video';
import Helpbar from './Helpbar/Helpbar';
// import { initiateConnection } from '../../webRTC/initiateConnection';
// import { answeringConnection } from '../../webRTC/answeringConnection';
const socket = io('ws://localhost:3001');
// const socket = io();

const Connection = ({ isConnected, userID }) => {
  // const [data, setData] = useState(initData);
  const peerRef = useRef();
  const messageRef = useRef();
  const otherMessageRef = useRef();

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

  //Only initiator
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
    const localDescription = peerRef.current.localDescription;
    socket.emit('relay', { data: localDescription, type: 'answer' });
  };
  const handleAnswer = async sdp => {
    console.log('handleAnswer');
    const description = new RTCSessionDescription(sdp);
    await peerRef.current.setRemoteDescription(description);
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
    //store this message in state, own message:)
    console.log(message);
    messageRef.current.send(message);
  };

  const handleDataChannelEvent = e => {
    console.log('4.handleDataChannelEvent');
    otherMessageRef.current = e.channel;
    otherMessageRef.current.onopen = e => {
      console.log('open!!!!');
      // otherMessageRef.current.send('Hi There Creator!');
      messageRef.current.send('Hi There Listener!');
    };
    otherMessageRef.current.onmessage = e =>
      console.log('message received!!!' + e.data);
    console.log(e);
    otherMessageRef.current.onclose = e => console.log('closed!!!!!!');
  };

  useEffect(() => {
    socket.emit('ready');
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

  return isConnected ? (
    <div className="connection">
      <Sidebar />
      <Chat sendMessage={sendMessage} />
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

// socket.on('connect', () => {
//   console.log('connected with the server');
//   socket.emit('webRTC_connect', 'HEJ');

//   //mockdata, should be sent from the server upon signaling?
//   const initiator = true;

//   const connection = new RTCPeerConnection();
//   // if (initiator) {
//   //   initiateConnection(connection);
//   // } else {
//   //   answeringConnection(connection);
//   // }
// });

// RTCPeerConnection.createDataChannel()
// RTCPeerConnection.close()
