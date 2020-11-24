const chalk = require('chalk');
const websocket = server => {
  const io = require('socket.io')(server);
  io.on('connection', socket => {
    console.log(
      chalk.blueBright('[socket.io]'),
      chalk.grey(socket.client.id),
      chalk.blue('connected'),
      chalk.grey(socket.handshake.headers['user-agent'])
    );

    socket.on('webRTC_connect', signal => {
      console.log(chalk.greenBright('webRTC_connect : ' + signal));
    });

    socket.on('disconnect', () => {
      console.log(
        chalk.blueBright('[socket.io]'),
        chalk.grey(socket.client.id),
        chalk.blue('disconnected')
      );
    });
  });
  return io;
};
module.exports = { websocket };
