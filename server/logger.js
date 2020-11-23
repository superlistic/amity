const uuid = require('uuid');
const chalk = require('chalk');

const logger = logs => (req, res, next) => {
  req.id = uuid.v4();

  let method;
  switch (req.method) {
    case 'POST':
      method = chalk.red(req.method);
      break;
    case 'GET':
      method = chalk.blue(req.method);
      break;
    default:
      method = req.method;
      break;
  }

  const log = new logs({
    logType: 'HTTP_request',
    data: {
      id: req.id,
      method: req.method,
      path: req.path,
      body: req.body,
      query: req.query,
      src: req.ip,
    },
  });

  console.log(
    chalk.grey(req.id),
    method,
    chalk.green(req.path),
    req.body,
    req.query
  );
  log
    .save()
    // .then(res => console.log({ ok: true, data: res }))
    .catch(err => console.log(err));
  next();
  // }
};

module.exports = { logger };
