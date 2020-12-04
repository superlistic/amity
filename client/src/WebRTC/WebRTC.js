export const createPeer = (
  handleICECandidateEvent,
  handleDataChannelEvent,
  handleTrackEvent,
  handleRemoveTrackEvent
) => {
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
  peer.ontrack = handleTrackEvent;
  peer.onremovetrack = handleRemoveTrackEvent;
  return peer;
};
