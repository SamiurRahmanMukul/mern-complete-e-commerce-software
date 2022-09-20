const currentDateTime = require('../lib/currentDateTime');

/**
 * function to all API same formatted success response provider
 * @param {Number} resultCode API response defined custom result_code
 * @param {String} title API response title based on result_code
 * @param {String} message API response your defined message
 * @param {*} data Send any kind of data in API response
 * @param {*} maintenance API provide any kind of maintenance information
 * @returns success response return for all API's
 */
exports.successResponse = (resultCode, title, message, data, maintenance) => ({
  result_code: resultCode,
  time: currentDateTime(),
  maintenance_info: maintenance || null,
  result: {
    title, message, data
  }
});

/**
 * function to all API same formatted error response provider
 * @param {Number} resultCode API response defined custom result_code
 * @param {String} title API response title based on result_code
 * @param {*} error Send any kind or error in API response
 * @param {*} maintenance API provide any kind of maintenance information
 * @returns error response return for all API's
 */
exports.errorResponse = (resultCode, title, error, maintenance) => ({
  result_code: resultCode,
  time: currentDateTime(),
  maintenance_info: maintenance || null,
  title,
  error
});

/**
 * function to success response login user with JWT access-token
 * @param {*} res node/express app res objects
 * @param {*} statusCode API response http status code
 * @param {Number} resultCode API response defined custom result_code
 * @param {String} title API response title based on result_code
 * @param {String} message API response your defined message
 * @param {*} user API response in login user information
 * @param {*} maintenance API provide any kind of maintenance information
 */
exports.loginResponse = (res, statusCode, resultCode, title, message, user, maintenance) => {
  const token = user.getJWTToken();

  // options for cookie
  const options = {
    expires: new Date(Date.now() + process.env.JWT_TOKEN_COOKIE_EXPIRES * 24 * 60 * 60 * 1000),
    httpOnly: true
  };

  res
    .status(statusCode)
    .cookie('AccessToken', token, options)
    .json({
      result_code: resultCode,
      time: currentDateTime(),
      maintenance_info: maintenance || null,
      AccessToken: token,
      result: {
        title,
        message,
        user: {
          useName: user.userName,
          fullName: user.fullName,
          email: user.email,
          phone: user.phone,
          avatar: process.env.APP_BASE_URL + user.avatar,
          gender: user.gender,
          role: user.role,
          status: user.status,
          createdAt: user.createdAt,
          updatedAt: user.updatedAt
        }
      }
    });
};
