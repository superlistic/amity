const secret = process.env.JWT_SECRET;
const jwt = require('jsonwebtoken');

const jwtMiddle = (req, res, next) => {
  try {
    req.token = jwt.verify(req.cookies.token, secret);
    console.log(req.token);
  } catch (err) {
    console.log(err.name, err.message);
  }
  res.cookie('token', jwt.sign({ jwt: 'dcfgvbhn' }, secret), {
    httpOnly: true,
  });

  next();
};
module.exports = { jwtMiddle };
