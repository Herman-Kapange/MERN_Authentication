const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');
const User = require('../models/userModel.js');

const protect = asyncHandler(async (req, res, next) => {
  let token;

  token = req.cookies.jwt;

  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      req.user = await User.findById(decoded.userId).select('-password'); // userId coming from jwt.sign, -password preventing password from getting returned

      next();
    } catch (error) {
      res.status(401);
      throw new Error('Not Authorized, invalid token');
    }
  } else {
    res.status(401);
    throw new Error('Not Authorized, no token');
  }
});

module.exports = { protect };
