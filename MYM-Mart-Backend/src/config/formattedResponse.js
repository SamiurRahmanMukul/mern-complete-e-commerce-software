const currentDateTime = require('../lib/currentDateTime');

/**
 * function to all API same formatted response provider
 * @param {Number} resultCode API response defined custom result_code
 * @param {String} title API response title based on result_code
 * @param {String} message API response your defined message
 * @param {Object} data Send any kind of data object in API response
 * @param {Object} error Send error object in API response
 * @param {*} maintenance Respondence in API any kind of maintenance info
 * @returns formatted response return for all API's
 */
const formattedResponse = (resultCode, title, message, data, error, maintenance) => ({
  result_code: resultCode,
  time: currentDateTime(),
  maintenance_info: maintenance || null,
  result: {
    title,
    message,
    data,
    error
  }
});

module.exports = formattedResponse;
