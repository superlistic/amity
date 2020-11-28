// export const createPeer = () => {
//   console.log('2.createPeer invoked');
//   const config = {
//     iceServers: [
//       {
//         urls: ['stun:stun.l.google.com:19302'],
//       },
//       {
//         urls: 'turn:numb.viagenie.ca',
//         credential: 'muazkh',
//         username: 'webrtc@live.com',
//       },
//     ],
//   };

//   const peer = new RTCPeerConnection(config);
//   console.log('peer');
//   console.log(peer);
//   return peer;
// };
export const createPeer = (handleICECandidateEvent, handleDataChannelEvent) => {
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
  console.log('peer');
  console.log(peer);
  return peer;
};
