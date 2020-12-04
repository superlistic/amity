import React, { useEffect, useRef, useLayoutEffect } from 'react';
import io from 'socket.io-client';
import { connect } from 'react-redux';

import './Connection.css';
import Sidebar from '../Sidebar/Sidebar';
import ConnectionLobby from './ConnectionLobby/ConnectionLobby';
import Chat from './Chat/Chat';
import Helpbar from './Helpbar/Helpbar';
import { createPeer } from '../../WebRTC/WebRTC';
import {
  messageReceived,
  messageSent,
  setConnectionEnded,
  setConnectionEstablished,
  handleOtherVideo,
  setFriendData,
  setSocket,
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
  setFriendData,
  setSocket,
}) => {
  const peerRef = useRef();
  const dataChannel = useRef();
  const localVideo = useRef();
  const remoteVideo = useRef();
  const userStream = useRef();
  const isInitiator = useRef(true);

  console.log('RENDER');
  // socket = io();

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
    await peerRef.current.setLocalDescription(answer);
    socket.emit('relay', { data: answer, type: 'answer' });
  };

  const handleAnswer = async sdp => {
    console.log('handleAnswer');
    console.log(sdp);
    const description = await new RTCSessionDescription(sdp);
    await peerRef.current.setRemoteDescription(description);
  };

  const handleCandidate = async data => {
    console.log('ICE FOUND, RTC successful');
    const candidate = await new RTCIceCandidate(data);
    await peerRef.current.addIceCandidate(candidate);
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

  const removeSharingVideo = () => {
    console.log('removeSharingVideo');
    const videoTrack = userStream.current.getVideoTracks()[0];
    const audioTrack = userStream.current.getVideoTracks()[0];
    const y = peerRef.current.getSenders()[0];
    const x = peerRef.current.getSenders()[1];

    if (videoTrack) {
      userStream.current.removeTrack(videoTrack);
      userStream.current.removeTrack(audioTrack);
      peerRef.current.removeTrack(y);
      peerRef.current.removeTrack(x);
      userStream.current = null;
    }

    localVideo.current = null;
  };

  const disconnectConnection = () => {
    console.log('disconnectConnection');
    socket.disconnect();
    dataChannel.current.close();
    peerRef.current.close();
    localVideo.current = null;
    remoteVideo.current = null;
    userStream.current = null;
    dataChannel.current = null;
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
    //När motpart lämnade = Cannot set propert srcObject of null.if not null?
    if (remoteVideo.current !== null && remoteVideo.current !== undefined) {
      console.log(e.streams);
      remoteVideo.current.srcObject = e.streams[0];
    }
  };

  const handleRemoveTrackEvent = async e => {
    console.log('handleRemoveTrackEvent');
    remoteVideo.current.srcObject = null;
  };

  useLayoutEffect(() => {
    socket = io();
    console.log(socket);
    setSocket(socket);
    socket.emit('ready');

    socket.on('matchUpdate', payload => {
      console.log(payload);
      setFriendData(payload.peer);
      if (payload.msg === '[socket] partner disconnected') {
        console.log('disconnect');
        // friendDisconnected();
      }
    });

    socket.on('makeOffer', async () => {
      console.log('User is making an offer');
      peerRef.current = await createPeer(
        handleICECandidateEvent,
        handleDataChannelEvent,
        handleTrackEvent,
        handleRemoveTrackEvent
      );
      await createChannel();
      handleNegotiationNeededEvent();
    });

    socket.on('awaitOffer', async () => {
      console.log('User waiting for offer');
      peerRef.current = await createPeer(
        handleICECandidateEvent,
        handleDataChannelEvent,
        handleTrackEvent,
        handleRemoveTrackEvent
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
        //När motpart lämnade = Cannot set propert srcObject of null.if not null?
        if (localVideo.current !== null && localVideo.current !== undefined) {
          localVideo.current.srcObject = stream;
        } else {
          console.log('ELSE!!');
          console.log('Could not find localVideo');
        }
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
      };

      videoCall();
    }
  }, [isVideo, isOtherVideo]);

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
          removeSharingVideo={removeSharingVideo}
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
          removeSharingVideo={removeSharingVideo}
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
            <p className="video__placeholder">You are sharing your webcam.</p>
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
          removeSharingVideo={removeSharingVideo}
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
        removeSharingVideo={removeSharingVideo}
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
  setFriendData,
  setSocket,
})(Connection);
