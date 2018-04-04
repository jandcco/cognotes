const User = require("../../database/Models/User");
const CreateUser = require("../../database/Actions/CreateUser");
const DeleteUser = require("../../database/Actions/DeleteUser");
const UpdateUsername = require("../../database/Actions/UpdateUsername");
const GetUsers = require("../../database/Actions/GetUsers");
const createUser = async (req, res) => {
  try{
    const newUser = await CreateUser(req.body.displayName, req.body.password);
    res.send("200 OK");
  } catch (e){
    res.send(e);
  }
}

const deleteUser = async (req, res) => {
  try {
    const initiatingUser = await User.findOne({_id: req.session.passport.id});
    if (initiatingUser.superuser){
      const userToDelete = await deleteUser(req.session.passport.user.id);
      res.json(userToDelete);
    } else {
      res.send("403 Forbidden");
    }
  } catch (e){
    res.send(e);
  }
}

const updateUsername = async (req, res) => {
  try{
    const updatedRecord = await UpdateUsername(req.body.newDisplayName);
    res.json(updatedRecord);
  } catch (e){
    res.send(e);
  }
}

const getUser = async (req, res) => {
  try{
    const user = await GetUser(req.query.user);
    res.json(user);
  } catch(e) {
    res.send(e);
  }
}
const getUsers = async (req, res) => {
  console.log(req.session);
  try{
    const user = await GetUsers(req.query.user);
    res.json(user);
  } catch(e) {
    res.send(e);
  }
}

const signedUp = async (req, res) => {
  res.send("OK");
}

const loggedIn = async (req, res) => {
  res.send("OK");
}
module.exports = {
  createUser,
  getUser,
  getUsers,
  updateUsername,
  deleteUser,
  loggedIn,
  signedUp
}