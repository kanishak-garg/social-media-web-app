const User = require('../models/users');


module.exports.profile = function (req, res) {
    // console.log(req.cookies);
    if (Object.keys(req.cookies).length === 0) {
        return res.redirect('/users/sign-in');
    }
    var id = req.cookies.user_id;
    User.findById(id, function (err, user) {
        if (err) { console.log("error in finding user_profile"); return }
        return res.render('user_profile', {
            title: "Profile",
            user: user
        });
    })

};


module.exports.sign_up = function (req, res) {
    return res.render('sign_up', {
        title: "sign_up"
    });
};


module.exports.sign_in = function (req, res) {
    return res.render('sign_in', {
        title: "sign_in"
    });
};

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
    //check for user n database
    User.findOne({ email: req.body.email }, function (err, user) {
        if (err) { console.log("error finding the user in sign-in"); return }

        //if user not found
        if (!user) {
            console.log("user not exit");
            return res.redirect('back');
        } else {  // if user is found
            //check password match or not
            if (user.password == req.body.password) {
                console.log("SIGNED in");

                // create session for the user
                res.cookie('user_id', user.id);
                return res.redirect('/users/profile');
            } else {
                return res.redirect('back');
            }
        }
    });
}


module.exports.signOut = function (req, res) {
    res.clearCookie("user_id");
    return res.redirect('/users/sign-in');
}