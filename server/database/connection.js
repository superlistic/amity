// const chalk = require('chalk');
// const mongoose = require('mongoose');

// const connect = async (uri, user, pass, authSource, schemaName, schema) => {
//   const options = {
//     auth: {
//       authSource,
//     },
//     user,
//     pass,
//     keepAlive: true,
//     keepAliveInitialDelay: 300000,
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   };
//   // console.log(chalk.white(uri));
//   // console.log(chalk.grey(JSON.stringify(options, null, 2)));
//   console.log(
//     chalk.yellowBright('[MongoDB]'),
//     chalk.yellow('Connecting with'),
//     options.user
//   );

//   const connection = await mongoose
//     .createConnection(uri, options)
//     .catch(err => {
//       console.log(
//         chalk.redBright('[MongoDB]'),
//         chalk.red('- connection error -')
//       );
//       console.log(err);
//       process.exit(1);
//     });

//   // TODO: why is this not printing?
//   connection.on('connected', () => {
//     console.log(
//       chalk.greenBright('[MongoDB]'),
//       chalk.green('Connected to '),
//       uri
//     );
//   });

//   // If the connection throws an error
//   connection.on('error', err => {
//     console.log(chalk.red(err.name), err);
//   });

//   // When the connection is disconnected
//   connection.on('disconnected', () => {
//     console.log(
//       chalk.yellowBright('[MongoDB]'),
//       chalk.yellow('connection disconnected')
//     );
//   });

//   process.on('SIGINT', () => {
//     connection.close(() => {
//       console.log(
//         chalk.redBright('[MongoDB]'),
//         chalk.red('App terminated, closing mongo connections')
//       );
//       process.exit(0);
//     });
//   });
//   const Model = connection.model(schemaName, schema);
//   return Model;
// };

// module.exports = { connect };
