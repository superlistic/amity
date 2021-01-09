import React, { useEffect, useRef, useLayoutEffect } from 'react';
import io from 'socket.io-client';
import { connect } from 'react-redux';

import './Connection.css';
import Sidebar from '../Sidebar/Sidebar';
import ConnectionLobby from './ConnectionLobby/ConnectionLobby';
import Chat from './Chat/Chat';
import Helpbar from './Helpbar/Helpbar';
import { createPeer } from '../../WebRTC/WebRTC';

import { setSocket } from '../../actions/auth';
import {
  messageReceived,
  messageSent,
  setConnectionEnded,
  setConnectionEstablished,
  handleOtherVideo,
  setFriendData,
  friendDisconnected,
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
  friendDisconnected,
}) => {
  const peerRef = useRef();
  const dataChannel = useRef();
  const localVideo = useRef();
  const remoteVideo = useRef();
  const userStream = useRef();
  const isInitiator = useRef(true);

  const createChannel = () => {
    dataChannel.current = peerRef.current.createDataChannel('dataChannel');
    dataChannel.current.onopen = e => {
      setConnectionEstablished();
    };
    dataChannel.current.onmessage = e => {
      const newMessage = e.data.toString();
      messageReceived({
        message: newMessage,
        client: false,
        date: Date.now(),
      });
    };
    dataChannel.current.onclose = e => {
      setConnectionEnded();
    };
  };

  const handleOffer = async (sdp, method) => {
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
    const description = await new RTCSessionDescription(sdp);
    await peerRef.current.setRemoteDescription(description);
  };

  const handleCandidate = async data => {
    const candidate = await new RTCIceCandidate(data);
    await peerRef.current.addIceCandidate(candidate);
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
    const { candidate } = e;
    if (candidate) {
      socket.emit('relay', { data: candidate, type: 'candidate' });
    }
  };

  const removeSharingVideo = () => {
    localVideo.current = null;
    if (userStream.current === null || userStream.current === undefined) return;
    if (peerRef.current === null || peerRef.current === undefined) return;

    const videoTrack = userStream.current.getVideoTracks()[0];
    // const audioTrack = userStream.current.getAudioTracks()[0];
    if (!videoTrack) return;

    const y = peerRef.current.getSenders()[0];
    const x = peerRef.current.getSenders()[1];
    if (y && x) {
      peerRef.current.removeTrack(y);
      peerRef.current.removeTrack(x);
    }
    userStream.current.getTracks().forEach(function (track) {
      track.stop();
    });
    // userStream.current.removeTrack(videoTrack);
    // userStream.current.removeTrack(audioTrack);
    userStream.current = null;
    socket.emit('relay', { data: '', type: 'removeOtherVideo' });
  };

  const disconnectConnection = async () => {
    console.log('Disconnecting!');
    await removeSharingVideo();
    if (dataChannel.current) dataChannel.current.close();
    peerRef.current.close();
    remoteVideo.current = null;
    // userStream.current = null;
    dataChannel.current = null;
    peerRef.current = null;
    // socket.close();
    socket.disconnect();
    //Skicka disconnect till socket?
  };

  const sendMessage = message => {
    dataChannel.current.send(message);
    messageSent({ message: message, client: true, date: Date.now() });
  };

  const handleDataChannelEvent = e => {
    dataChannel.current = e.channel;
    dataChannel.current.onopen = e => {
      setConnectionEstablished();
    };
    dataChannel.current.onmessage = e => {
      const newMessage = e.data.toString();
      messageReceived({
        message: newMessage,
        client: false,
        date: Date.now(),
      });
    };
    dataChannel.current.onclose = e => {
      setConnectionEnded();
    };
  };

  const handleTrackEvent = async e => {
    if (remoteVideo.current !== null && remoteVideo.current !== undefined) {
      remoteVideo.current.srcObject = e.streams[0];
    }
  };

  const handleRemoveTrackEvent = async e => {
    if (!remoteVideo.current) return;
    remoteVideo.current.srcObject = null;
    handleOtherVideo(false);
  };

  useLayoutEffect(() => {
    socket = io();
    setSocket(socket);
    socket.emit('ready');

    socket.on('matchUpdate', payload => {
      setFriendData(payload.peer);
    });

    socket.on('friendDisconnected', payload => {
      console.log(payload);
      if (payload.msg === '[socket] partner disconnected') {
        console.log('Friend disconnected, check state');
        disconnectConnection();
        friendDisconnected();
      }
    });

    socket.on('makeOffer', async () => {
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
        case 'removeOtherVideo':
          return handleRemoveTrackEvent();
        default:
          return 'error';
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (isVideo) {
      const videoCall = async () => {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: true,
        });
        if (localVideo.current !== null && localVideo.current !== undefined) {
          localVideo.current.srcObject = stream;
        }
        if (peerRef.current === undefined) {
          console.log('UNDEFINED egen video,create new?');
        } else if (
          userStream.current === null ||
          userStream.current === undefined
        ) {
          console.log(peerRef.current);
          console.log(stream);
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

  if (!isVideo && !isOtherVideo)
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

  if (!isVideo && isOtherVideo)
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

  if (isVideo && !isOtherVideo)
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
  friendDisconnected,
})(Connection);
