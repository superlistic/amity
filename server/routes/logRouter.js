const express = require('express');
const router = express.Router();
const chalk = require('chalk');

const errorHandler = (req, res, err) => {
  res.json({ ...err, ok: false }),
    console.log(
      chalk.red(req.id),
      chalk.redBright(err.codeName),
      chalk.grey(err)
    );
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
