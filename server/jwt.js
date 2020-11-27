const secret = process.env.JWT_SECRET;
const jwt = require('jsonwebtoken');
const { env } = process;
const expiresIn = env.JWT_EXP || '2h';
const Jogger = require('./Jogger');
const log = new Jogger('jwt verifyer');

log.mute('token exp set to ' + expiresIn);

const signer = data => {
  return jwt.sign(data, secret, { expiresIn });
};

// Return token if valid. otherwise false
const verifyer = token => {
  if (!token) {
    log.mute('-no token-');
    return false;
  }
  try {
    const tok = jwt.verify(token, secret);
    // define required fields below
    if (tok.userId && tok.iat && tok.exp) {
      log.ok('-OK- ', tok.userId);
      return tok;
    }
    log.err('-malformed token- ');
  } catch (err) {
    log.warn(err.name);
    return false;
  }
};

const jwtMiddle = (req, res, next) => {
  try {
    req.token = verifyer(req.cookies['x-access-token']);
  } catch (err) {
    log.warn(err.name);
    req.tokenError = err.name;
  }
  next();
};
module.exports = { jwtMiddle, signer, verifyer };
