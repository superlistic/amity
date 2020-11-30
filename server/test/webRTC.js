// // HELPER
// const $events = document.getElementById('events');

// const newItem = content => {
//   const item = document.createElement('li');
//   item.innerText = content;
//   return item;
// };

// // GLOBALS
// let peerConnection;
// let dataChannel;
// let localStream;
// let remoteStream;

// // RTCPeerConnectionConfig
// const config = {
//   iceServers: [
//     {
//       urls: ['stun:stun.l.google.com:19302'],
//     },
//     // {
//     //   urls: 'turn:127.0.0.1:3478',
//     //   credential: '',
//     //   username: '',
//     // },
//   ],
// };

// const getStats = () => {
//   peerConnection.getStats(null).then(stats => {
//     var statsOutput = '';

//     stats.forEach(report => {
//       // if (report.type === 'inbound-rtp' && report.kind === 'video') {
//       Object.keys(report).forEach(statName => {
//         statsOutput += `<strong>${statName}:</strong> ${report[statName]}<br>\n`;
//       });
//       // }
//     });

//     document.querySelector('.stats-box').innerHTML = statsOutput;
//   });
// };

// const showDataChannel = () => {
//   console.log('data channel:', dataChannel);
// };
// const showStream = () => {
//   console.log('local stream:', localStream);
//   console.log('remote stream:', remoteStream);
// };

// const showlocalConnection = () => {
//   console.log('peer connection:', peerConnection);
// };
// const sendOnDataChannel = () => {
//   const msg = document.querySelector('#username').value;
//   dataChannel.send(msg);
//   console.log('webRTC-send: ', msg);
// };

// const attatchDataChannelHandlers = dc => {
//   dc.onmessage = e => console.log('webRTC-recieved: ', e.data);
//   dc.onopen = e => console.log('connection opened', e);
//   dc.onclose = e => console.log('connection closed', e);
//   dc.onclosíng = e => console.log('connection closing', e);
//   dc.onerror = e => console.log('connection error', e);
// };

// const createDataChannel = (label = 'data') => {
//   dataChannel = peerConnection.createDataChannel(label);
//   attatchDataChannelHandlers(dataChannel);
// };

// const addEventListenersToPeer = peer => {
//   console.log('addEventListenersToPeer()');
//   peer.onicecandidate = e => {
//     socket.emit('relay', {
//       type: 'candidate',
//       data: e.candidate ? e.candidate : null,
//     });
//   };
//   peer.ontrack = event => {
//     console.log('on track');
//     console.log(remoteStream);
//     remoteStream.addTrack(event.track, remoteStream);
//     console.log(remoteStream);
//   };
//   peer.ondatachannel = e => {
//     // console.log('peerConnection: dataChannel', e);
//     dataChannel = e.channel;
//     attatchDataChannelHandlers(dataChannel);
//   };
//   peer.onaddstream = e => {
//     remoteStream = e.stream;
//     addEventListenersToStream(remoteStream);
//     const remoteElement = document.querySelector('video#remoteVideo');
//     remoteElement.srcObject = remoteStream;
//     console.log(remoteStream);
//   };
//   peer.onaddtrack = e => {
//     console.log('addtrack');
//   };
//   peer.addEventListener('track', async event => {
//     console.log('addevntlistener');
//     remoteStream.addTrack(event.track, remoteStream);
//   });
// };

// const addEventListenersToStream = s => {
//   s.onactive = e => console.log('active', e);
//   s.onaddtrack = e => console.log('add track', e);
//   s.oninactive = e => console.log('inactive', e);
//   s.onremovetrack = e => console.log('removetrack', e);
//   console.log('ADD STREAM EVENT LISTENERS:', s);
// };
// // STREAMS
// const newLocalStream = () => {
//   const constraints = {
//     video: false,
//     audio: true,
//   };
//   navigator.mediaDevices
//     .getUserMedia(constraints)
//     .then(s => {
//       addEventListenersToStream(s);
//       s.getTracks().forEach(track => {
//         peerConnection.addTrack(track, s);
//         console.log(track);
//         localStream = s;
//       });
//     })
//     .catch(error => {
//       console.error('Error accessing media devices.', error);
//     });
//   peerConnection.createOffer().then(offer => {
//     peerConnection
//       .setLocalDescription(offer)
//       .then(() => {
//         socket.emit('relay', {
//           type: 'offer',
//           data: offer,
//         });
//       })
//       .catch(err => console.log('make offer ERROR', err));
//   });
// };
// const newRemoteStream = async () => {
//   console.log('new remote stream', remoteStream);
//   peerConnection.addEventListener('track', async event => {
//     console.log('oll add track');
//     remoteStream.addTrack(event.track, remoteStream);
//   });
//   peerConnection.ontrack = async event => {
//     console.log('ontrack');
//     remoteStream.addTrack(event.track, remoteStream);
//   };
// };
// // SOCKET LISTENERS
// socket.on('connect', () => {
//   console.log('[socket] connected');
// });
// socket.on('disconnect', e => {
//   console.log('[socket]', e);
// });

class AmityRTC {
  constructor() {
    const config = {
      iceServers: [
        {
          urls: ['stun:stun.l.google.com:19302'],
        },
        // {
        //   urls: 'turn:127.0.0.1:3478',
        //   credential: '',
        //   username: '',
        // },
      ],
    };
    this.pc = new RTCPeerConnection(config);
  }
  createOffer() {
    return this.pc.createOffer();
  }
}

export default AmityRTC;
