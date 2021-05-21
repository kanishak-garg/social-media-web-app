const passport = require('passport');
const googleStrategy = require('passport-google-oauth').OAuth2Strategy;
const crypto = require('crypto');
const User = require('../models/users');
const credentials = require('../credentials/google_credential');
// ask  passport to use new stratergy
passport.use(new googleStrategy({
    // add credentials here
    clientID: credentials.clientID,
    clientSecret: credentials.clientSecret,
    callbackURL: credentials.callbackURL
  },
  function(accessToken, refreshToken, profile, done) {
      // profile contains details of the user trying to login
      // checking if user exists in database
      User.findOne({email:profile.emails[0].value},function(err,user){
          if(err){ console.log("error in google passport config file",err);return; }
            // if found set it as req.user
          if(user){
             return done(null,user);
          }else{
              // if no then create user and then set it to req.user
              User.create({
                  name:profile.displayName,         // as per property in profile console log profile to see
                  email:profile.emails[0].value,
                  password: crypto.randomBytes(20).toString('hex') //generate random password in hex format
              },function(err,user){
                  if(err){ console.log("error in creating user in google passport");return; }
                  return done(null,user);
              })
          }
      })
  }
));