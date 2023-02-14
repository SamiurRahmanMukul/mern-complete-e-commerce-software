/*
 * Name: MYM-MART E-Commerce ~ Backed
 * Description: Build an E-Commerce for node.js, express.js application from the scratch
 * Author: Md. Samiur Rahman (Mukul)
 * Last Modified: 23/01/2023
 * Version: 1.0.0
 *
 */

// imports modules & dependencies
const app = require('./src/app');
const logger = require('./src/middleware/winston.logger');

// app listens to .env defined port
app.listen(process.env.APP_PORT, () => {
  logger.info(`App server running on: ${process.env.APP_BASE_URL}`);
});
