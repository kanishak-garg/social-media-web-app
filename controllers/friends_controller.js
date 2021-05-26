const { response } = require('express');
const Friend = require('../models/friends');
const User = require('../models/users');

module.exports.addFriend = async function(req,res){
    try{
        let newFriend = await Friend.create({
            from:req.user._id,
            to:req.params.id
        });
        req.user.friends.push(req.params.id);
        req.user.save();
        req.flash("success","friend added");
        return res.redirect('/');
    }catch(err){
        console.log(err);
        return res.redirect('back');
    }
} 