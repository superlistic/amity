const uuid = require('uuid');
const dbConnector = require('./db').connect;

const Logger = class {
  constructor() {
    this.count = 0;
    this.connected = false;
    this.logs = null;
  }
  async connect() {
    this.logs = await dbConnector('loggs');
  }
  middleware(req, res, next) {
    req.uuid = uuid.v4();
    req.timestamp = new Date();
    const logJson = {
      type: 'http_request',
      id: req.uuid,
      timestamp: req.timestamp,
      method: req.method,
      path: req.path,
      source_ip: req.ip,
      secure: req.secure,
    };
    console.log(JSON.stringify(logJson, null, 2));
    console.log(this);
    this.logs.insertOne(logJson, function (err, res) {
      if (err) throw err;
    });
    next();
  }
};

const logger = () => () => {};

module.exports = { Logger };
