/*
 * Name: MYM-Mart-Backend
 * Description: MYM-Mart-Backend with Node.js, Express.js, MongoDB
 * Author: Md. Samiur Rahman (Mukul)
 * Version: v1.0.0
 * Last Modified: 05/09/2022
 *
 */

// imports modules & dependencies
const express = require('express');
const env = require('dotenv');
const favicon = require('serve-favicon');
const path = require('path');
const crossOrigin = require('cors');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const formattedResponse = require('./src/config/formattedResponse');

// imports application routes & configs
const { notFoundRoute, errorHandler } = require('./src/config/errorHandler');
const productsRoute = require('./src/routes/products.route');
const catagoriesRoute = require('./src/routes/catagories.route');
const usersRoute = require('./src/routes/users.route');

// loads environment variables from .env file
env.config();

// initializes express app
const app = express();

// application database connection establishment
const connectDatabase = require('./src/database/connect');

connectDatabase();

// allows cross-origin resource sharing
const cors = crossOrigin({ origin: '*' });
app.use(cors);

// parses cookies from request
app.use(cookieParser());

// parses body of request
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// sets favicon in routes
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));

// sets static folder
app.use(express.static('public'));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// response default (welcome) route
app.get('/', (_req, res) => {
  try {
    res.status(200).json(formattedResponse(
      0,
      'SUCCESS',
      'Welcome to MYM-Mart E-commerce application backend.'
    ));
  } catch (error) {
    res.status(500).json(formattedResponse(
      2,
      'SERVER SIDE ERROR',
      'Something went wrong! Data fetching failed.',
      {},
      error
    ));
  }
});

// sets application routes
app.use(process.env.APP_API_PREFIX, usersRoute); // users routes
app.use(process.env.APP_API_PREFIX, catagoriesRoute); // catagories routes
app.use(process.env.APP_API_PREFIX, productsRoute); // products routes

// 404 - not found error handler
app.use(notFoundRoute);

// 500 - internal server error handler
app.use(errorHandler);

// app listens to defined port
app.listen(process.env.APP_PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`MYM-Mart backend server running on: ${process.env.APP_BASE_URL}`);
});
