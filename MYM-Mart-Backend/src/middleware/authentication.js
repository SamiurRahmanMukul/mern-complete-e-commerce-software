const jwt = require('jsonwebtoken');
const User = require('../models/users.model');

// make a middleware for routes without token can't access
exports.isAuthenticatedApiFetcher = async (req, res, next) => {
  try {
    // get token form headers
    // eslint-disable-next-line camelcase
    const { x_ecommymmart } = req.headers;

    // eslint-disable-next-line camelcase
    if (!x_ecommymmart) {
      return res.status(401).json({
        statusCode: 401,
        message: 'Unrecognized access can not be allowed'
      });
    }

    jwt.verify(x_ecommymmart, process.env.JWT_SECRET_KEY, (err, result) => {
      if (err) {
        return res.status(401).json({
          statusCode: 401,
          message: 'Unrecognized access can not be allowed',
          error: err
        });
      }

      const { url } = result;
      const splitUrl = url.split(process.env.APP_API_PREFIX)[1];

      if (splitUrl === req.path || splitUrl === req.url) {
        next();
      } else {
        res.status(401).json({
          statusCode: 401,
          message: 'Unrecognized access can not be allowed'
        });
      }
    });
  } catch (error) {
    res.status(500).json({
      statusCode: 500,
      message: 'Unrecognized access can not be allowed',
      error
    });
  }
};

// make a middleware for authenticated login user
exports.isAuthenticatedUser = async (req, res, next) => {
  try {
    // get token form cookie
    const { authorization } = req.headers;

    if (!authorization) {
      return res.status(401).json({
        statusCode: 401,
        message: 'Authorization headers is required'
      });
    }

    // split token from authorization header
    const token = authorization.split(' ')[1];

    // verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

    // check if user exists
    const user = await User.findById(decoded.id);

    if (!user) {
      return res.status(401).json({
        statusCode: 401,
        message: 'Authorization headers are invalid'
      });
    }

    // check if user is logged in
    if (user.status === 'login') {
      req.user = user;
      next();
    } else {
      return res.status(401).json({
        statusCode: 401,
        message: 'Unauthorized access. Please login to continue'
      });
    }
  } catch (error) {
    res.status(500).json({
      statusCode: 500,
      message: 'Unauthorized access. User identify failed',
      error
    });
  }
};

// make a middleware for check if user is admin
exports.isAdmin = async (req, res, next) => {
  try {
    // get user from req.user
    const { user } = req;

    if (!user) {
      return res.status(401).json({
        statusCode: 401,
        message: 'Unauthorized access. Please login to continue'
      });
    }

    // check user status & role is admin
    if (user.status === 'login' && user.role === 'admin') {
      next();
    } else {
      return res.status(401).json({
        statusCode: 401,
        message: 'Unauthorized access. Only authorized user access here'
      });
    }
  } catch (error) {
    res.status(500).json({
      statusCode: 500,
      message: 'Unauthorized access. User identify failed',
      error
    });
  }
};
