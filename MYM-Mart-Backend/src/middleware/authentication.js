const jwt = require('jsonwebtoken');
const formattedResponse = require('../config/formattedResponse');
const User = require('../models/users.model');

// !middleware for authenticated login user
exports.isAuthenticatedUser = async (req, res, next) => {
  try {
    // get access token form authorization headers
    const { authorization } = req.headers;

    if (!authorization) {
      return res.status(403).json(formattedResponse(
        3,
        'ACCESS FORBIDDEN',
        'Authorization headers is required'
      ));
    }

    // split token from authorization header
    const token = authorization.split(' ')[1];

    // verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

    // check if user exists
    const user = await User.findById(decoded.id);

    if (!user) {
      return res.status(404).json(formattedResponse(
        4,
        'UNKNOWN ACCESS',
        'Authorization headers is invalid'
      ));
    }

    // check if user is logged in
    if (user.status === 'login') {
      req.user = user;
      next();
    } else {
      return res.status(401).json(formattedResponse(
        1,
        'FAILED',
        'Unauthorized access. Please login to continue'
      ));
    }
  } catch (err) {
    res.status(500).json(formattedResponse(
      2,
      'SERVER SIDE ERROR',
      'Sorry, Something went wrong. Please try again'
    ));
  }
};

// !middleware for check if user is admin
exports.isAdmin = async (req, res, next) => {
  try {
    // get user from requested user
    const { user } = req;

    if (!user) {
      return res.status(404).json(formattedResponse(
        4,
        'UNKNOWN ACCESS',
        'Sorry, User does not exist'
      ));
    }

    // check user status & role is admin
    if (user.role === 'admin') {
      next();
    } else {
      return res.status(406).json(formattedResponse(
        6,
        'UNABLE TO ACCESS',
        'Accessing the page or resource you were trying to reach is forbidden'
      ));
    }
  } catch (error) {
    res.status(500).json(formattedResponse(
      2,
      'SERVER SIDE ERROR',
      'Sorry, Something went wrong. Please try again',
      null,
      error
    ));
  }
};
