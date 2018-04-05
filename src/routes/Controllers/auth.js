const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const User = require("../../database/Models/User");
const GetUserByEmail = require("../../database/Actions/GetUserByEmail");
const jwt = require("jsonwebtoken");
const tempSecret = "TEMPORARYNOTREALLYPRIVATEKEY";

const signUserWebToken = (user) => {
  const newToken = jwt.sign(JSON.stringify(user, null, "\t"), tempSecret);
  return newToken;
}

const verifyUserWebToken = (existingToken) => {
  const user = jwt.verify(existingToken, tempSecret);
  return user;
}

const verifyTokenMiddleWare = (req, res, next) => {
  console.log("verifying user token");
  if (req.query.token){
    console.log("returning token from query string")
    req.tokenBearer = verifyUserWebToken(req.query.token);
    next();
  } else if (req.body.token){
    console.log("returning token from body")
    req.tokenBearer = verifyUserWebToken(req.body.token);
    next();
  } else{
    console.log("No tokens found");
    res.send("403")
  }

}

const logUserInLocal = async function(req, email, password, done){

  try{
    const existingUser = await GetUserByEmail(email);
    if (existingUser){
      const passwordCheck = await existingUser.verifyPassword(password);
      if (passwordCheck){
        console.log(req.session);
        return done(null, existingUser);
      } else{
        return done(null, false)
      }
    }
  } catch (e){
    console.log(e);
    return done (e, false);
  }

};

passport.use("local-login", new LocalStrategy({usernameField: "email", passReqToCallback: true},
  logUserInLocal
));

passport.serializeUser(function(user, done) {
  done(null, user._id);
});

// FIXME: This is never called
passport.deserializeUser(async function(id, done) {
  try {
    const user = await User.findOne({_id:id});
    if (user){
      return done (null, user);
    }
  } catch (e){
    done(e, false);
  }
});

const tryAuthenticateLocal = passport.authenticate("local-login");

module.exports = {
  tryAuthenticateLocal,
  signUserWebToken,
  verifyUserWebToken,
  verifyTokenMiddleWare
}
