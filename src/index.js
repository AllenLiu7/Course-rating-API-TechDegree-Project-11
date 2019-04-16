"use strict";

// load modules
const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const routes = require("./routes/routes");

const app = express();

const mongoose = require("mongoose");
mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost/course-api", { useNewUrlParser: true });
mongoose.connection
  .once("open", () => console.log("good to go!"))
  .on("error", console.error.bind(console, "connection error:"));

// set our port
app.set("port", process.env.PORT || 5000);

// morgan gives us http request logging
app.use(morgan("dev"));
app.use(bodyParser());
app.use(routes);
// TODO add additional routes here

// uncomment this route in order to test the global error handler
// app.get('/error', function (req, res) {
//   throw new Error('Test error');
// });

// send 404 if no other route matched
app.use((req, res) => {
  res.status(404).json({
    message: "Route Not Found"
  });
});

// global error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({
    message: err.message,
    error: {}
  });
});

// start listening on our port
const server = app.listen(app.get("port"), () => {
  console.log(`Express server is listening on port ${server.address().port}`);
});

module.exports = app;
