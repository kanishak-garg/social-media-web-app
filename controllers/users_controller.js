const User = require('../models/users');
const fs = require('fs');
const path = require('path');
const passport = require('passport');

module.exports.profile = function (req, res) {
    User.findById(req.params.id,function(err,user){
        if(err){ console.log("error finding user in profile controller"); return; }
        
        if(user){
            return res.render('user_profile', {
                title: "Profile", 
                profile_user: user 
            });
        }
    })
};

module.exports.edit_profile = async function(req,res){
    
    if(req.user.id == req.params.id){

        try {
        let user = await User.findById(req.params.id);
        User.uploadedAvatar(req,res,function(err){
            if(err){ console.log("multer error in users_controller"); return; }

            user.name = req.body.name;
            user.email = req.body.email;

            if(req.file){
                if(user.avatar && fs.existsSync(path.join(__dirname,'..',user.avatar))){
                    fs.unlinkSync(path.join(__dirname,'..',user.avatar));
                }
                // set the location of the file
                user.avatar = User.avatarPath + '/' + req.file.filename;
            }
            user.save();
            return res.redirect('back');
        });
        } catch (error) {
            req.flash("error","can not update the profile");
            return res.redirect('back');
        }
    }else{
        req.flash("error","can not update the profile");
            return res.redirect('back');
    }
    
        
//     if(req.user.id == req.params.id){
//     //we can just pass req.body ,req.body, as it contains same feilds only
//     User.findByIdAndUpdate(req.user.id,{name:req.body.name,email:req.body.email},function(err,user){
//         return res.redirect('back');
//     });
// }else{
//     return res.status(401).send("not authorised");
// }

}

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
    req.flash('success',"you have logged out");
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
            User.uploadedAvatar(req,res,function(err){
                if(err){ console.log("multer error in users_controller"); return; }
                User.create(req.body, function (err, user) {
                    if (err) { console.log("error in creating user with sign up"); return; }
                    return res.redirect('/users/sign-in');
                });
            });
            
        } else {
            return res.redirect('back');
        }
    });
};


module.exports.createSession = function (req, res) {
    req.flash('success',"successfully logged in");
    return res.redirect('/');
}

