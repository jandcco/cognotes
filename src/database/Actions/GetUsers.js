const User = require("../Models/User");

const GetUsers = async () => {
  return await User.find({});
}

module.exports = GetUsers;