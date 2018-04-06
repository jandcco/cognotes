// Basic Dependancies & App Initialization
const path = require("path");
const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const logger = require("morgan");
const mongoClient = require("./database/client");
let passport = require("passport");
const config = require("./config/config").getConfig();
const app = express();

// Set middlewares
app.use(logger("dev"));
app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());


app.use(passport.initialize());
app.use(passport.session());

mongoClient();

const index = require('./routes/index');
app.use(function(req, res, next) {
  console.log(req.session);
  res.header("Access-Control-Allow-Credentials", "true");
  res.header("Access-Control-Allow-Origin", "http://cognotes-client.herokuapp.com");
  res.header("Access-Control-Allow-Headers", "Access-Control-Allow-Credentials, Origin, X-Requested-With, Content-Type, Accept, Authorization");
  next();
});

// Set Routes


app.use("/", index);

// Set Error Handling (Should be done after all routes are defined)
app.use(function(req, res, next){
  var err = new Error("Not Found");
  err.status = 404;
  next(err);
});

app.use(function(err, req, res, next){ // eslint-disable-line no-unused-vars
  res.status(err.status || 500);
  res.send(err.status);
});

// Start the Server
app.listen(process.env.PORT || 8080);

module.exports = app;
