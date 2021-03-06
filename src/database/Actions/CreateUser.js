const bcrypt = require("bcrypt");
const User = require("../Models/User");

const CreateUser = async (email, displayName, password) => {

  try{
    let hashedPassword;
    if (password){
      hashedPassword = await bcrypt.hash(password, 10);
    } else{
      const noPasswordError = new Error("No password was included");
      throw noPasswordError;
    }
    const newUser = new User({
      email,
      displayName,
      password: hashedPassword,
      superuser: false
    });

    await newUser.save();
    return newUser;
  } catch (e){
    // Handle validation/duplicate user errors here
    if (e.name === "MongoError" || e.code === 11000){
      const duplicateUserError = new Error("User already exists with that username");
      throw duplicateUserError;
    } else if (e.name === "ValidationError"){
      const validatorError = new Error(e.message);
      throw validatorError;
    }
  }
};

module.exports = CreateUser;
