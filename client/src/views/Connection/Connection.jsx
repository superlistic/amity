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
  const localVideo = useRef();
  const remoteVideo = useRef();
  const userStream = useRef();

  const createChannel = () => {
    console.log('Create CHANNEL');
    sendDataChannel.current = peerRef.current.createDataChannel(
      'sendDataChannel'
    );
    sendDataChannel.current.onopen = e => console.log('open!!!!');
    sendDataChannel.current.onmessage = e =>
      console.log('messsage received!!!' + e.data);
    sendDataChannel.current.onclose = e => console.log('closed!!!!!!');
    //Redo to work with either DC or Track?
  };

  const handleOffer = async (sdp, method) => {
    console.log('handleOffer');
    const description = await new RTCSessionDescription(sdp);
    console.log(sdp);
    console.log(method);
    console.log(peerRef.current);
    await peerRef.current.setRemoteDescription(description);
    console.log(peerRef.current);
    const answer = await peerRef.current.createAnswer();
    peerRef.current.setLocalDescription(answer);
    if (method === 'video') {
      userStream.current
        .getTracks()
        .forEach(track => peerRef.current.addTrack(track, userStream.current));
    } else {
      sendDataChannel.current = peerRef.current.createDataChannel(
        'receiveDataChannel'
      );
    }
    //OR TRACK?
    socket.emit('relay', { data: answer, type: 'answer' });
  };

  const handleAnswer = async sdp => {
    console.log('handleAnswer');
    const description = await new RTCSessionDescription(sdp);
    await peerRef.current.setRemoteDescription(description);
  };

  const handleCandidate = async data => {
    console.log('ICE FOUND, RTC successful');
    const candidate = await new RTCIceCandidate(data);
    console.log(peerRef.current);
    console.log(candidate);
    peerRef.current.addIceCandidate(candidate);
  };

  const handleNegotiationNeededEvent = async type => {
    const offer = await peerRef.current.createOffer();
    await peerRef.current.setLocalDescription(offer);
    const localDescription = peerRef.current.localDescription;
    socket.emit('relay', {
      data: localDescription,
      type: 'offer',
      method: type,
    });
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

  const handleTrackEvent = e => {
    console.log('handleTrackEvent');
    console.log(e);
    remoteVideo.current.srcObject = e.streams[0];
    // if (e.streams && e.streams[0]) {
    //   //  videoElem.srcObject = ev.streams[0];
    // } else {
    //   let inboundStream = new MediaStream(e.track);
    //   remoteVideo.current.srcObject = inboundStream;
    // }
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
        handleDataChannelEvent,
        handleTrackEvent
      );
      await createChannel();
      handleNegotiationNeededEvent();
    });

    socket.on('awaitOffer', async () => {
      console.log('User waiting for offer');
      peerRef.current = await createPeer(
        handleICECandidateEvent,
        handleDataChannelEvent,
        handleTrackEvent
      );
    });

    socket.on('relay', payload => {
      const { type, data, method } = payload;
      console.log('relay', payload);
      switch (type) {
        case 'offer':
          return handleOffer(data, method);
        case 'answer':
          return handleAnswer(data, method);
        case 'candidate':
          return handleCandidate(data);
        default:
          return 'error';
      }
    });
  }, []);

  useEffect(() => {
    if (isVideo) {
      console.log('video tajm');
      //Nedan behöver även den som svarar få tag i, antagligen m.ha socket eller smart lösning?
      //--------------------------------------------------------------
      const videoCall = async () => {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: true,
        });
        localVideo.current.srcObject = stream;
        userStream.current = stream;

        userStream.current
          .getTracks()
          .forEach(track =>
            peerRef.current.addTrack(track, userStream.current)
          );
        //--------------------------------------------------------------

        console.log(userStream.current);
        console.log(stream);
        handleNegotiationNeededEvent('video');
      };

      videoCall();
    }
  }, [isVideo]);
  // }

  // Kill video stream
  // stream.getTracks().forEach(track => track.stop());

  return communicationAccepted ? (
    <div className="connection">
      <Sidebar />
      {!isVideo ? (
        <Chat sendMessage={sendMessage} />
      ) : (
        <div>
          <video autoPlay muted ref={localVideo} />
          <video autoPlay ref={remoteVideo} />
        </div>
      )}
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
