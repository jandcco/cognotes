const User = require("../Models/User");

const UpdateUsername = (newDisplayName) => {
  const user = User.findOne({displayName:newDisplayName});
  if (!user){
    user.displayName = newDisplayName;
  }
  user.save();
  return user.username;
}