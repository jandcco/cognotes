const LocalStrategy = require("passport-local").Strategy;
const User = require("../database/Models/User");
const CreateUser = require("../database/Actions/CreateUser");
const GetUser = require("../database/Actions/GetUser");
/*
  Passport Config is sent out as a function
*/
module.exports = function(passport){
  /*
    These functions handle serializing and deserializing the user.
  */
  
  passport.serializeUser(function(user, done){
    done(null, user._id);
  });

  passport.deserializeUser(async function(id, done){
    try {
      await User.findOne({_id:id});
      if (user){
        return done (null, user);
      }
    } catch (e){
      done(e, false);
    }
  });

  /*
    Here we configure two different local strategies for passport--
    One handles signing up, one handles signing in.
    
    Assume User.addUser also handles password hashing.
  */
  passport.use('local-signup',new LocalStrategy({
      usernameField: "displayName"
    },
    async function(username, password, done){
      try{
        const newUser = await CreateUser(username, password);
        if (newUser){
          return done(null, newUser);
        }
      } catch (e) {
        console.log(e);
        done (e, false);
      }
    }
  ));

  passport.use('local-login', new LocalStrategy({
      usernameField: "displayName"
    },
    async function(username, password, done){
      
      try{
        console.log(username, password)
        const existingUser = await GetUser(username);
        if (existingUser){
          const passwordCheck = await existingUser.verifyPassword(password);
          if (passwordCheck){
            return done(null, existingUser);
          }
        }
      } catch (e){
        console.log(e);
        done (e, false);
      } 
    }
  ));
};