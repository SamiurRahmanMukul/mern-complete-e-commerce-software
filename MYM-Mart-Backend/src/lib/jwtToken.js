// create jwtToken and save cookies
const jwtToken = (user, status, message, res) => {
  const token = user.getJWTToken();

  // options for cookie
  const options = {
    expires: new Date(Date.now() + process.env.JWT_TOKEN_COOKIE_EXPIRES * 24 * 60 * 60 * 1000),
    httpOnly: true,
  };

  res
    .status(status)
    .cookie("AccessToken", token, options)
    .json({
      statusCode: status,
      message: message,
      AccessToken: token,
      data: {
        id: user._id,
        useName: user.userName,
        fullName: user.fullName,
        email: user.email,
        phone: user.phone,
        avatar: process.env.APP_BASE_URL + user.avatar,
        gender: user.gender,
        role: user.role,
        status: user.status,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      },
    });
};

module.exports = jwtToken;
