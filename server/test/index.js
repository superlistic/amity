import AmitySocket from './socket.js';
import AmityRTC from './webRTC.js';

const matchUpdateHandler = data => {
  addNotice(data);
  console.log(data);
};
const makeOfferHandler = data => {
  console.log(data);
};
const awaitOfferHandler = data => {
  console.log(data);
};

const latestEl = document.getElementById('latest');
const listEl = document.getElementById('events');

const addNotice = note => {
  const prev = latest.innerText;
  latestEl.innerText = note;
  const item = document.createElement('li');
  item.innerText = prev;
  listEl.appendChild(item);
};

function clearEvents() {
  latestEl.innerText = 'events cleared';
  listEl.innerHTML = '';
}

latestEl.innerText = 'script loaded';

const soc = new AmitySocket();
const rtc = new AmityRTC();

soc.onRelay(({ type, data }) => {
  if (type === 'candidate') {
    addNotice('candidate');
    rtc.handleCandidate(data).catch(err => console.log(err));
  } else if (type === 'offer') {
    rtc
      .handleOffer(data)
      .then(answer => {
        soc.relay(answer);
      })
      .catch(err => console.log(err));
  } else if (type === 'answer') {
    rtc.handleAnswer(data).catch(err => console.log(err));
  }
});
soc.onMakeOffer(async () => {
  rtc.createOffer.then(o => soc.relay(o)).catch(err => console.log(err));
});
soc.onMatchUpdate(console.log);
soc.onAwaitOffer(console.log);
function readyConn() {
  soc.readyForConnection();
}

window.clearEvents = clearEvents;
window.readyConn = readyConn;
// window.sendOnDC = sendOnDC;
// window.openStream = openStream;
// window.logDC = console.log(rtc.dataChannel);
// window.logPC = console.log(rtc.peerConnection);
