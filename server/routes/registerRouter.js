const express = require('express');
const router = express.Router();
const chalk = require('chalk');
const Jogger = require('../Jogger');
const log = new Jogger(chalk.red('[registerRouter]'));
const uuid = require('uuid');
const user = require('../database/schemas/user');

const errorHandler = (req, res, err) => {
  res.json({ ok: false, error: err });
  log.err(req.id + err.codeName, err);
};

const registerRouter = Users => {
  // POST
  const postNewUser = (req, res) => {
    try {
      const regEmail = req.body.email.toLowerCase();
      const regUsername = req.body.username;
      const regPassword = req.body.password.toLowerCase();
      Users.findOne(
        { email: regEmail },
        {
          _id: 0,
          updated: 1,
        }
      ).then(email => {
        if (email) {
          res.status(400);
          log.warn('Failed to register: Email Duplicate');
          res.json({
            error: 'EmailDuplicateError',
            'user-reason': 'this email is already registered.',
          });
        } else if (regEmail && regPassword && regUsername) {
          try {
            const userInfo = {
              userId: uuid.v4(),
              facebookToken: '',
              googleToken: '',
              username: regUsername,
              email: regEmail,
              passwordHash: regPassword,
              bio: '',
              tagline: '',
              avatar: `https://avatars.dicebear.com/4.1/api/initials/${regUsername}.svg`,
              callHistory: {},
              settings: {
                profileVisible: true,
              },
              suggestions: {},
            };
            const newUser = new Users(userInfo);
            newUser
              .save()
              .then(result => {
                res.json({
                  userId: result.userId,
                  username: result.username,
                  email: result.email,
                  bio: result.bio,
                  tagline: result.tagline,
                  avatar: result.avatar,
                  callHistory: result.callHistory,
                  settings: result.settings,
                  updated: result.updated,
                });
                log.info('new user added', regEmail);
              })
              .catch(err => Error(err));
          } catch (err) {
            res.status(500);
            res.json(err);
            throw Error(err);
          }
        } else {
          res.status(400);
          log.err(
            'Failed to add new user. invalid info recieved from client',
            regEmail
          );
          res.json({
            error: 'InvalidBody',
            'user-reason': 'Server got invalid information.',
          });
        }
      });
    } catch (err) {
      errorHandler(req, res, err);
    }
  };
  router.post('/', postNewUser);
  return router;
};

module.exports = { registerRouter };
