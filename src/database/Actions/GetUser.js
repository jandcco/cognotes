const User = require("../Models/User");

const GetUser = async (userName) => {
  return await User.findOne({displayName: username});
}

module.exports = GetUser;