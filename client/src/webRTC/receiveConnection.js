export const answeringConnection = async (remoteConnection, offer) => {
  remoteConnection.onicecandidate = e => {
    console.log(' NEW ice candidate!! on localconnection reprinting SDP ');
    console.log(JSON.stringify(remoteConnection.localDescription));
  };

  remoteConnection.ondatachannel = e => {
    const receiveChannel = e.channel;
    receiveChannel.onmessage = e =>
      console.log('messsage received!!!' + e.data);
    receiveChannel.onopen = () => console.log('open!!!!');
    receiveChannel.onclose = () => console.log('closed!!!!!!');
    remoteConnection.channel = receiveChannel;
  };

  remoteConnection
    .setRemoteDescription(offer)
    .then(answer => console.log('done'));

  //create answer
  await remoteConnection
    .createAnswer()
    .then(answer => remoteConnection.setLocalDescription(answer))
    .then(answer =>
      console.log(JSON.stringify(remoteConnection.localDescription))
    );
};

// rc.dc.send();
