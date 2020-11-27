const express = require('express');
const router = express.Router();
const Jogger = require('../Jogger');
const log = new Jogger('logRoute');

const errorHandler = (req, res, err) => {
  res.json({ ...err, ok: false }), log.err(err.codeName, req.id);
};

const logRouter = Log => {
  const getLogs = (req, res) => {
    Log.find()
      .where({ logType: 'HTTP_request' })
      .then(res => {
        res.json({ ok: true, data: res });
      })
      .catch(err => {
        res.json({ ...err, ok: false });
      });
  };

  // ROUTES
  router.get('/', getLogs);
  return router;
};
module.exports = { logRouter };
