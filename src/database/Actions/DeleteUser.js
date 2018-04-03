const User = require("../Models/User");

const DeleteUser = async (userId) => {
  try{
    await User.findOneAndRemove({_id: userId});
  } catch (e){
    throw e;
  }
}

module.exports = DeleteUser;