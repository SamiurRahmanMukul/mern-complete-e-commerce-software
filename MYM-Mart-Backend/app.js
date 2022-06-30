/*
 * Name: MYM-Mart-Backend
 * Description: MYM-Mart-Backend with Node.js, Express, MongoDB
 * Author: Md. Samiur Rahman (Mukul)
 * Version: v1.0.0
 * Date: 31/5/2022
 * Last Modified: 30/6/2021
 *
 */

// imports modules & dependencies
const express = require("express");
const env = require("dotenv");
const favicon = require("serve-favicon");
const path = require("path");
const crossOrigin = require("cors");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");

// imports application routes & configs
const { notFoundRoute, errorHandler } = require("./src/config/errorHandler");
const productsRoute = require("./src/routes/products.route");
const catagoriesRoute = require("./src/routes/catagories.route");
const usersRoute = require("./src/routes/users.route");

// loads environment variables from .env file
env.config();

// initializes express app
const app = express();

// application database connection establishment
const connectDatabase = require("./src/database/connect");
connectDatabase();

// allows cross-origin resource sharing
const cors = crossOrigin({ origin: "*" });
app.use(cors);

// parses cookies from request
app.use(cookieParser());

// parses body of request
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// sets favicon in routes
app.use(favicon(path.join(__dirname, "public", "favicon.ico")));

// sets static folder
app.use(express.static("public"));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// sets default route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to MYM-Mart E-commerce application backend." });
});

// sets application routes
app.use(process.env.APP_API_PREFIX, productsRoute); // products routes
app.use(process.env.APP_API_PREFIX, catagoriesRoute); // catagories routes
app.use(process.env.APP_API_PREFIX, usersRoute); // users routes

// 404 - not found error handler
app.use(notFoundRoute);

// 500 - internal server error handler
app.use(errorHandler);

// app listens to defined port
app.listen(process.env.APP_PORT, () => {
  console.log("MYM-Mart backend server running on: " + process.env.APP_BASE_URL);
});
