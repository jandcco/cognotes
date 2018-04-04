const express = require("express");
const userController = require("../routes/Controllers/user");
const router = express.Router();
const ensureLoggedIn = require("connect-ensure-login").ensureLoggedIn;
const passport = require("passport");

<<<<<<< HEAD
const {getNotes, createNote, deleteNote, updateNote} = require("./Controllers/note")

router.post("/note", createNote);

router.get("/", (req, res) => {
  res.send("Woo");
});
=======
router.route("/users")
  .get(ensureLoggedIn(), userController.getUsers)
  .post(passport.authenticate("local-signup"), userController.signedUp)
  .put(ensureLoggedIn(), userController.updateUsername)
  .delete(ensureLoggedIn(), userController.deleteUser)
>>>>>>> Add user route and authentication

router.route("/login")
  .post(passport.authenticate("local-login"), userController.loggedIn)

  module.exports = router;
