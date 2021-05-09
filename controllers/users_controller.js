const User = require('../models/users');

const passport = require('passport');
module.exports.profile = function (req, res) {
    return res.render('user_profile', {
        title: "Profile"
    });
};


module.exports.sign_up = function (req, res) {
    if (req.isAuthenticated()) {
        return res.redirect('/users/profile');
    }
    return res.render('sign_up', {
        title: "sign_up"
    });
};


module.exports.sign_in = function (req, res) {
    if (req.isAuthenticated()) {
        return res.redirect('/users/profile');
    }

    return res.render('sign_in', {
        title: "sign_in"
    });
};

module.exports.sign_out = function (req, res) {
    req.logout();
    res.redirect('/');
}

// creating new user (SIGN UP)
module.exports.create = function (req, res) {
    if (req.body.confirm_password != req.body.password) {
        console.log("password not matching");
        return res.redirect('back');
    }

    User.findOne({ email: req.body.email }, function (err, user) {
        if (err) { console.log("error in finding user"); return; }
        if (user) {
            console.log("already exists");
        }
        if (!user) {
            User.create(req.body, function (err, user) {
                if (err) { console.log("error in creating user with sign up"); return; }
                return res.redirect('/users/sign-in');
            });
        } else {
            return res.redirect('back');
        }
    });
};


module.exports.createSession = function (req, res) {
    return res.redirect('/');
}

