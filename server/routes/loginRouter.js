const express = require('express');
const router = express.Router();
const chalk = require('chalk');
const Jogger = require('../Jogger');
const log = new Jogger(chalk.magenta('[loginRouter]'));
const { signer } = require('../jwt');

const errorHandler = (req, res, err) => {
  res.json({ ok: false, error: err });
  log.err(req.id + err.codeName, err);
};

const loginRouter = Users => {
  // GET
  const getLoggedIn = (req, res) => {
    if (req.token) {
      res.status(200);
      Users.findOne(
        { userId: req.token.userId },
        {
          _id: 0,
          userId: 1,
          username: 1,
          email: 1,
          bio: 1,
          tagline: 1,
          avatar: 1,
          callHistory: 1,
          settings: 1,
          usedSuggestions: 1,
          updated: 1,
        }
      )
        .then(user => {
          if (user && user.userId) {
            res.cookie('x-access-token', signer({ userId: user.userId }), {
              httpOnly: true,
            });
            res.status(200);
            res.json({
              ok: true,
              user,
            });
            log.ok('login succeeded', req.id);
          } else {
            res.status(401);
            res.json({ ok: false, message: 'No such user' });
            log.fail('get user failed', req.id);
          }
        })
        .catch(err => {
          errorHandler(req, res, err);
        });
    } else {
      res.status(401);
      res.json({
        status: '401',
        msg: 'NOT authenticated',
      });
    }
  };
  // POST
  const postUser = (req, res) => {
    // const normalizedEmail = req.body.email.toLowerCase();
    // TODO this
    Users.findOne(
      { email: req.body.email, passwordHash: req.body.hash },
      {
        _id: 0,
        userId: 1,
        username: 1,
        email: 1,
        bio: 1,
        tagline: 1,
        avatar: 1,
        callHistory: 1,
        settings: 1,
        usedSuggestions: 1,
        updated: 1,
      }
    )
      .then(user => {
        if (user && user.userId) {
          res.cookie('x-access-token', signer({ userId: user.userId }), {
            httpOnly: true,
          });
          res.status(200);
          res.json({
            ok: true,
            user,
          });
          log.ok('login succeeded', req.id);
        } else {
          res.status(401);
          res.json({ ok: false, message: 'No such user' });
          log.fail('login failed', req.id);
        }
      })
      .catch(err => {
        errorHandler(req, res, err);
      });
  };

  // ROUTES
  router.get('/', getLoggedIn);
  router.post('/', postUser);
  return router;
};
module.exports = { loginRouter };
