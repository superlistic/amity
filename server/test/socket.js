// // SOCKET METHODS
// const relay = () => {
//   const msg = document.querySelector('#username').value;
//   socket.emit('relay', { type: 'manual', payload: msg });
//   console.log('relaying:', msg);
// };
// const connect = () => {
//   socket.emit('ready', { type: 'ready', data: null });
//   console.log('ready emitted:');
// };

// const disconnect = () => {
//   const username = document.querySelector('#username').value;
//   socket.disconnect();
//   // console.log('socket.disconnect()');
// };

// // await offer
// socket.on('awaitOffer', () => {
//   $events.innerHTML = '';
//   console.log('[socket] awaitOffer');
//   peerConnection = new RTCPeerConnection(config);
//   addEventListenersToPeer(peerConnection);
// });
// // make offer
// socket.on('makeOffer', payload => {
//   $events.innerHTML = '';
//   console.log('[socket] makeOffer');
//   peerConnection = new RTCPeerConnection(config);
//   createDataChannel();
//   addEventListenersToPeer(peerConnection);

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
// });
// // match update
// socket.on('matchUpdate', payload => {
//   console.log('match update: ', payload.msg);
// });

// // relay
// socket.on('relay', payload => {
//   switch (payload.type) {
//     case 'offer':
//       peerConnection
//         .setRemoteDescription(payload.data)
//         .then(() => {
//           peerConnection.createAnswer().then(answer => {
//             peerConnection.setLocalDescription(answer).then(() => {
//               socket.emit('relay', {
//                 type: 'answer',
//                 data: answer,
//               });
//             });
//           });
//         })
//         .catch(err => console.log('got offer ERROR', err));
//       break;
//     case 'answer':
//       peerConnection.setRemoteDescription(payload.data).then(() => {});
//       break;
//     case 'candidate':
//       if (!payload.data) {
//         break;
//       }
//       peerConnection.addIceCandidate(payload.data);
//       break;
//     default:
//       console.log('relay');
//       console.log(payload);
//       break;
//   }
// });

class AmitySocket {
  constructor(label = 'AmitySocket') {
    this.label = label;
    this.io = io();
  }

  readyForConnection() {
    this.io.emit('ready', { type: 'ready', data: null });
  }
  relay(payload) {
    this.io.emit('relay', { type: 'relay', data: payload });
  }
  onMatchUpdate(handler) {
    this.io.on('matchUpdate', payload => handler(payload));
  }
  onRelay(handler) {
    this.io.on('relay', payload => handler(payload));
  }
  onMakeOffer(handler) {
    this.io.on('makeOffer', payload => handler(payload));
  }
  onAwaitOffer(handler) {
    this.io.on('awaitOffer', payload => handler(payload));
  }
}

export default AmitySocket;
