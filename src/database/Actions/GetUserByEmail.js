const User = require("../Models/User");

const GetUserByEmail = async (email) => {
  return await User.findOne({email});
}

module.exports = GetUserByEmail;