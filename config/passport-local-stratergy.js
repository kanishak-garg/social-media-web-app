const passport = require('passport');
const LocalStratergy = require('passport-local');

const User = require('../models/users');
const { pass } = require('./mongoose');

passport.use(new LocalStratergy({
    usernameField: 'email'
},
    function (email, password, done) {
        User.findOne({ email: email }, function (err, user) {
            if (err) {
                console.log("error in finding user -->passport");
                return done(err);
            }
            if (!user || user.password != password) { return done(null, false); }

            return done(null, user);
        });
    }
));

//serializing the user to check which key to be kept in cookies
passport.serializeUser(function (user, done) {
    done(null, user.id);
});



//deserializing the user fromkey in the cookies
passport.deserializeUser(function (id, done) {
    User.findById(id, function (err, user) {
        if (err) {
            console.log("error finding user -> deserializer");
            return done(err);
        }
        return done(null, user);
    });
});


passport.checkAuthenticated = function (req, res, next) {
    //check if user is authenticated then pass to next function( controller )
    if (req.isAuthenticated()) {
        return next();
    }
    // if user is not signed in
    return res.redirect('/users/sign-in');
}

passport.setAuthenticatedUser = function (req, res, next) {
    if (req.isAuthenticated()) {
        // passing info of signed in user from req to res
        res.locals.user = req.user;
    }
    next();
}


// passport.seeSignedInPage = function (req, res, next) {
//     if (req.isAuthenticated()) {
//        return res.redirect('back');
//     }
//     next();
// }



module.exports = passport;