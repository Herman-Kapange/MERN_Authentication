const jwt = require('jsonwebtoken');

const generateToken = (res, userId) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: '1d',
  });

  // http cookie configuration
  res.cookie('jwt', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV !== 'development', //strict https on cookies in production
    sameSite: 'strict', // Prevent CSRF attacks
    maxAge: 60 * 60 * 24, // setting 1d expiry time in seconds
  });
};

module.exports = generateToken;
