const express = require("express");
const userController = require("../routes/Controllers/user");
const router = express.Router();
const ensureLoggedIn = require("connect-ensure-login").ensureLoggedIn;
const passport = require("passport");

router.route("/users")
  .get(ensureLoggedIn(), userController.getUsers)
  .post(passport.authenticate("local-signup"), userController.signedUp)
  .put(ensureLoggedIn(), userController.updateUsername)
  .delete(ensureLoggedIn(), userController.deleteUser)

router.route("/login")
  .post(passport.authenticate("local-login"), userController.loggedIn)
  
  module.exports = router;
