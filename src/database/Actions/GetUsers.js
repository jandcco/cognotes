const User = require("../Models/User");

const GetUsers = async () => {

  const users = await User.find({});
  return users;
}

module.exports = GetUsers;