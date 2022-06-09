/*
 * Name: MYM-Mart-Backend
 * Description: MYM-Mart-Backend with Node.js, Express, MongoDB
 * Author: Md. Samiur Rahman (Mukul)
 * Version: v1.0.0
 * Date: 31/5/2022
 * Last Modified: 9/6/2021
 *
 */

// imports modules & dependencies
const express = require("express");
const env = require("dotenv");
const favicon = require("serve-favicon");
var path = require("path");

// imports application routes
const getAllProductsRoute = require("./src/routes/get_all_products.route");

// loads environment variables from .env file
env.config();

// initializes express app
const app = express();

// application database connection establishment
const connectDatabase = require("./src/database/connect");
connectDatabase();

// sets favicon in routes
app.use(favicon(path.join(__dirname, "public", "favicon.ico")));

// sets static folder
app.use(express.static(path.join(__dirname, "public")));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// sets default route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to MYM-Mart E-commerce application backend." });
});

// sets application routes
app.use(process.env.APP_API_PREFIX, getAllProductsRoute); // gets all products route

// app listens to defined port
app.listen(process.env.APP_PORT, () => {
  console.log("MYM-Mart backend server started on: " + process.env.APP_BASE_URL);
});
