const express = require("express");
const userController = require("../routes/Controllers/user");
const auth = require("../routes/Controllers/auth");
const router = express.Router();
const passport = require("passport");

const myEnsureLogin = (req, res, next) => {
  if(req.session && req.session.passport) {
    next()
  } else {
    res.redirect('/login')
  }
}

router.route("/users")
  .get(auth.verifyTokenMiddleWare, userController.getUsers)
  .post(passport.authenticate("local-signup"), userController.signedUp)
  .put(auth.verifyTokenMiddleWare, userController.updateUsername)
  .delete(auth.verifyTokenMiddleWare, userController.deleteUser)

router.route("/login")
  .post(auth.tryAuthenticateLocal, userController.loggedIn)
  
  module.exports = router;