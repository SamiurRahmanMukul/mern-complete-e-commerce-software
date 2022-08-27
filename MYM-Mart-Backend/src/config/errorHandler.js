/* eslint-disable no-unused-vars */
// 404 - not found error handler
exports.notFoundRoute = (_req, res, _next) => {
  res.status(404).json({
    statusCode: 404,
    message: 'Sorry! Your request url was not found.'
  });
};

// 500 - internal server error handler
exports.errorHandler = (err, _req, res, next) => {
  if (res.headersSent) {
    return next('Something went wrong.');
  }
  if (err.message) {
    res.status(500).json({
      statusCode: 500,
      message: err.message
    });
  } else {
    res.status(500).json({
      statusCode: 500,
      message: 'There was an error.'
    });
  }
};
