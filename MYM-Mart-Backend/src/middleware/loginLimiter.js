const rateLimit = require('express-rate-limit');
const formattedResponse = require('../config/formattedResponse');
const { logEvents } = require('./logger');

const loginLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 5, // Limit each IP to 5 login requests per `window` per minute
  message: { message: 'Too many login attempts from this IP, please try again after a 60 second pause' },
  handler: (req, res, _next, options) => {
    logEvents(`Too Many Requests: ${options.message.message}\t${req.method}\t${req.url}\t${req.headers.origin}`, 'err-log.log');
    res.status(options.statusCode).send(formattedResponse(
      29,
      'TOO MANY REQUEST',
      options.message.message
    ));
  },
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false // Disable the `X-RateLimit-*` headers
});

module.exports = loginLimiter;
