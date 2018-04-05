const express = require("express");
const userController = require("../routes/Controllers/user");
const auth = require("../routes/Controllers/auth");
const router = express.Router();
const passport = require("passport");

<<<<<<< HEAD
<<<<<<< HEAD
const {getNotes, createNote, deleteNote, updateNote} = require("./Controllers/note")

router.post("/note", createNote);

router.get("/", (req, res) => {
  res.send("Woo");
});
=======
=======
const myEnsureLogin = (req, res, next) => {
  if(req.session && req.session.passport) {
    next()
  } else {
    res.redirect('/login')
  }
}

>>>>>>> Super basic jwt authentication
router.route("/users")
  .get(auth.verifyTokenMiddleWare, userController.getUsers)
  .post(passport.authenticate("local-signup"), userController.signedUp)
<<<<<<< HEAD
  .put(ensureLoggedIn(), userController.updateUsername)
  .delete(ensureLoggedIn(), userController.deleteUser)
>>>>>>> Add user route and authentication

router.route("/login")
  .post(passport.authenticate("local-login"), userController.loggedIn)

  module.exports = router;
=======
  .put(auth.verifyTokenMiddleWare, userController.updateUsername)
  .delete(auth.verifyTokenMiddleWare, userController.deleteUser)

router.route("/login")
  .post(auth.tryAuthenticateLocal, userController.loggedIn)
  
  module.exports = router;
>>>>>>> Super basic jwt authentication
