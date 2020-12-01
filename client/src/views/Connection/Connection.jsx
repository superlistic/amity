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
  handleOtherVideo,
} from '../../actions/connection';
let socket;
const Connection = ({
  messageReceived,
  messageSent,
  setConnectionEnded,
  setConnectionEstablished,
  isVideo,
  communicationAccepted,
  isOtherVideo,
  handleOtherVideo,
}) => {
  const peerRef = useRef();
  const dataChannel = useRef();
  const receiveDataChannel = useRef();
  const localVideo = useRef();
  const remoteVideo = useRef();
  const userStream = useRef();
  const isInitiator = useRef(true);

  console.log('RENDER');

  const createChannel = () => {
    console.log('Create CHANNEL');
    dataChannel.current = peerRef.current.createDataChannel('dataChannel');
    dataChannel.current.onopen = e => {
      setConnectionEstablished();
      console.log('open!!!!');
    };
    dataChannel.current.onmessage = e => {
      const newMessage = e.data.toString();
      messageReceived({
        message: newMessage,
        client: false,
        date: Date.now(),
      });
      console.log('messsage received!!!' + e.data);
    };
    dataChannel.current.onclose = e => {
      setConnectionEnded();
      console.log('closed!!!!!!');
    };
  };

  const handleOffer = async (sdp, method) => {
    console.log('handleOffer');
    if (method === 'video') {
      await handleOtherVideo(true);
    }
    const description = await new RTCSessionDescription(sdp);
    await peerRef.current.setRemoteDescription(description);
    const answer = await peerRef.current.createAnswer();
    peerRef.current.setLocalDescription(answer);
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
    peerRef.current.addIceCandidate(candidate);
  };

  const handleNegotiationNeededEvent = async type => {
    console.log('handleNegotiationNeededEvent');
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
    dataChannel.current.close();
    receiveDataChannel.current.close();
    //stäng ned track också
    userStream.current.stop();
    localVideo.current = null;
    remoteVideo.current = null;
    userStream.current = null;
    peerRef.current.close();
    dataChannel.current = null;
    receiveDataChannel.current = null;
    peerRef.current = null;
  };

  const sendMessage = message => {
    dataChannel.current.send(message);
    messageSent({ message: message, client: true, date: Date.now() });
  };

  const handleDataChannelEvent = e => {
    console.log('handleDataChannelEvent');
    dataChannel.current = e.channel;
    dataChannel.current.onopen = e => {
      console.log('WebRTC DC: open.');
      setConnectionEstablished();
    };
    dataChannel.current.onmessage = e => {
      const newMessage = e.data.toString();
      console.log('WebRTC DC: message received');
      messageReceived({
        message: newMessage,
        client: false,
        date: Date.now(),
      });
    };
    dataChannel.current.onclose = e => {
      console.log('WebRTC DC: closed');
      setConnectionEnded();
    };
  };

  const handleTrackEvent = async e => {
    console.log('handleTrackEvent');
    remoteVideo.current.srcObject = e.streams[0];
  };

  useEffect(() => {
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
      const videoCall = async () => {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: true,
        });
        localVideo.current.srcObject = stream;
        console.log(localVideo.current);
        console.log('userStream.current--------------------------');
        console.log(isInitiator.current === true);

        if (isInitiator.current === true) {
          userStream.current = stream;
          userStream.current
            .getTracks()
            .forEach(track =>
              peerRef.current.addTrack(track, userStream.current)
            );
          handleNegotiationNeededEvent('video');
          isInitiator.current = false;
        }
        console.log(userStream.current);
        console.log(stream);
      };

      videoCall();
    }
  }, [isVideo, isOtherVideo]);

  // useEffect(() => {
  //   console.log('isOtherVideo');
  //   const receiveVideoCall = async () => {
  //     // remoteVideo.current = await new MediaStream();
  //     console.log(remoteVideo.current);
  //   };
  //   receiveVideoCall();
  // }, [isOtherVideo]);
  // }

  // communicationAccepted false

  // communicationAccepted true
  //    isVideo true isOtherVideo true == Båda ska se varandra i storskärm
  //    isVideo true isOtherVideo false == Chat + lite bild för client, chat + stor för other?
  //    isVideo false isOtherVideo true == Chat + stor bild för client, chat + liten för other?
  //    isVideo false isOtherVideo false == Chat för client, chat för other

  if (!communicationAccepted) return <ConnectionLobby socket={socket} />;

  if (!isVideo && !isOtherVideo) {
    console.log('!isVideo && !isOtherVideo');
    return (
      <div className="connection">
        <Sidebar />
        <div className="connection__main">
          <Chat sendMessage={sendMessage} />
          <video
            autoPlay
            ref={remoteVideo}
            className="remote-video--disabled"
          />
        </div>
        <Helpbar
          sendMessage={sendMessage}
          disconnectConnection={disconnectConnection}
        />
      </div>
    );
  }

  if (!isVideo && isOtherVideo) {
    console.log('!isVideo && isOtherVideo');
    return (
      <div className="connection">
        <Sidebar />
        <div className="connection__main">
          <div className="video-container">
            <video
              autoPlay
              ref={remoteVideo}
              height="100%"
              width="100%"
              className="remote-video"
            />
          </div>
          <Chat sendMessage={sendMessage} />
        </div>
        <Helpbar
          sendMessage={sendMessage}
          disconnectConnection={disconnectConnection}
        />
      </div>
    );
  }
  if (isVideo && !isOtherVideo) {
    console.log('isVideo && !isOtherVideo');
    return (
      <div className="connection">
        <Sidebar />
        <div className="connection__main">
          <div className="video-container">
            <video
              autoPlay
              muted
              ref={localVideo}
              height="100%"
              width="100%"
              className="local-video"
            />
          </div>
          <Chat sendMessage={sendMessage} />
        </div>
        <Helpbar
          sendMessage={sendMessage}
          disconnectConnection={disconnectConnection}
        />
      </div>
    );
  }

  return (
    <div className="connection">
      <Sidebar />
      <div className="connection__main">
        <div className="video-container">
          <video
            autoPlay
            ref={remoteVideo}
            height="100%"
            width="100%"
            className="remote-video"
          />
          <video
            autoPlay
            muted
            ref={localVideo}
            height="100%"
            width="100%"
            className="local-video"
          />
        </div>
        <Chat sendMessage={sendMessage} />
      </div>
      <Helpbar
        sendMessage={sendMessage}
        disconnectConnection={disconnectConnection}
      />
    </div>
  );
};

const mapStateToProps = state => ({
  communicationAccepted: state.connection.communicationAccepted,
  isConnected: state.connection.isConnected,
  isVideo: state.connection.isVideo,
  isOtherVideo: state.connection.isOtherVideo,
});

export default connect(mapStateToProps, {
  messageReceived,
  messageSent,
  setConnectionEnded,
  setConnectionEstablished,
  handleOtherVideo,
})(Connection);

// {
//   !isVideo ? (
//     <Chat sendMessage={sendMessage} />
//   ) : (
//     <div>
//       <div>
//         <video autoPlay ref={remoteVideo} height="70%" width="50%" />
//       </div>
//       <video autoPlay muted ref={localVideo} height="30%" width="20%" />
//     </div>
//   );
// }
