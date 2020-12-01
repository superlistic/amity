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
      handleOtherVideo();
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
        case 'offerVideo':
          return handleOtherVideo();
        default:
          return 'error';
      }
    });
  }, []);

  useEffect(() => {
    if (isVideo) {
      // socket.emit('relay', { data: 'video', type: 'offerVideo' });
      console.log('video tajm');
      //Nedan behöver även den som svarar få tag i, antagligen m.ha socket eller smart lösning?
      //--------------------------------------------------------------
      const videoCall = async () => {
        console.log(remoteVideo.current);
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: true,
        });
        localVideo.current.srcObject = stream;
        // localVideo.current.srcObject = stream;
        console.log(localVideo.current);
        // remoteVideo.current.srcObject = stream;
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
        //--------------------------------------------------------------

        console.log(userStream.current);
        console.log(stream);
      };

      videoCall();
    }
  }, [isVideo]);

  useEffect(() => {
    console.log('isOtherVideo');
    const receiveVideoCall = async () => {
      // remoteVideo.current = await new MediaStream();
      console.log(remoteVideo.current);
    };
    receiveVideoCall();
  }, [isOtherVideo]);
  // }

  // Kill video stream
  // stream.getTracks().forEach(track => track.stop());

  //isVideo, isOtherVideo, communicationAccepted

  // const chatMethod = () => {
  //   const key = `${isVideo}-${isOtherVideo}`;

  //   return (
  //     <div>
  //       {
  //         {
  //           'true-true': (
  //             <div>
  //               <div>
  //                 <video autoPlay ref={remoteVideo} height="70%" width="50%" />
  //               </div>
  //               <video
  //                 autoPlay
  //                 muted
  //                 ref={localVideo}
  //                 height="30%"
  //                 width="20%"
  //               />
  //             </div>
  //           ),
  //           'false-true': (
  //             <div>
  //               <div>
  //                 <video autoPlay ref={remoteVideo} height="70%" width="50%" />
  //                 <Chat sendMessage={sendMessage} />
  //               </div>
  //             </div>
  //           ),
  //           'true-false': (
  //             <div>
  //               <div>
  //                 <Chat sendMessage={sendMessage} />
  //               </div>
  //               <video
  //                 autoPlay
  //                 muted
  //                 ref={localVideo}
  //                 height="30%"
  //                 width="20%"
  //               />
  //             </div>
  //           ),

  //           'false-false': <Chat sendMessage={sendMessage} />,
  //         }[key]
  //       }
  //     </div>
  //   );
  // };

  // communicationAccepted false

  // communicationAccepted true
  //    isVideo true isOtherVideo true == Båda ska se varandra i storskärm
  //    isVideo true isOtherVideo false == Chat + lite bild för client, chat + stor för other?
  //    isVideo false isOtherVideo true == Chat + stor bild för client, chat + liten för other?
  //    isVideo false isOtherVideo false == Chat för client, chat för other

  // <div>
  //       <video autoPlay ref={remoteVideo} height="70%" width="50%" />
  //     </div>
  //     {!isVideo ? (
  //       <Chat sendMessage={sendMessage} />
  //     ) : (
  //       <div>
  //         <div>
  //           <video autoPlay ref={remoteVideo} height="70%" width="50%" />
  //         </div>
  //         <video autoPlay muted ref={localVideo} height="30%" width="20%" />
  //       </div>
  //routes mellan lobby och connection?

  if (!communicationAccepted)
    return (
      <div className="connection">
        <Sidebar />
        <ConnectionLobby />
      </div>
    );

  // if (!isVideo) {
  //   console.log('!isvideo');
  //   return isOtherVideo ? (
  //     <div className="connection">
  //       <Sidebar />
  //       <div>
  //         <video autoPlay ref={remoteVideo} height="70%" width="50%" />
  //       </div>
  //       <Helpbar
  //         sendMessage={sendMessage}
  //         disconnectConnection={disconnectConnection}
  //       />
  //     </div>
  //   ) : (
  //     <div className="connection">
  //       <Sidebar />
  //       <video
  //         className="remote__video--disabled"
  //         autoPlay
  //         ref={remoteVideo}
  //         height="70%"
  //         width="50%"
  //       />
  //       <Helpbar
  //         sendMessage={sendMessage}
  //         disconnectConnection={disconnectConnection}
  //       />
  //     </div>
  //   );
  // }
  if (!isVideo && !isOtherVideo) {
    console.log('!isVideo && !isOtherVideo');
    return (
      <div className="connection">
        <Sidebar />
        <div>
          <div>
            <video autoPlay ref={remoteVideo} height="70%" width="50%" />
            <Chat sendMessage={sendMessage} />
          </div>
          <video autoPlay muted ref={localVideo} height="30%" width="20%" />
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
        <div>
          <div>
            <video autoPlay ref={remoteVideo} height="70%" width="50%" />
            <Chat sendMessage={sendMessage} />
          </div>
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
        <div>
          <div>
            <Chat sendMessage={sendMessage} />
            <video autoPlay muted ref={localVideo} height="30%" width="20%" />
          </div>
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
      <div>
        <video autoPlay ref={remoteVideo} height="70%" width="50%" />
        <video autoPlay muted ref={localVideo} height="30%" width="20%" />
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
