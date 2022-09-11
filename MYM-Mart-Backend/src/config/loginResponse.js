const currentDateTime = require('../lib/currentDateTime');

const loginResponse = (res, statusCode, resultCode, title, message, user, maintenance) => {
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

module.exports = loginResponse;
