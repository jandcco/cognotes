const User = require("../Models/User");

const GetUser = async (displayName) => {
  return await User.findOne({displayName});
}

module.exports = GetUser;