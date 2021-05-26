const Friend = require('../models/friends');
const User = require('../models/users');

module.exports.addFriend = async function(req,res){
    try{
        let user = await User.findById(req.user._id);
        if(user.friends.includes(req.params.id)){
            req.flash("error","friend already exist");
            return res.redirect('/');
        }
        let newFriend = await Friend.create({
            from:req.user._id,
            to:req.params.id
        });
        req.user.friends.push(req.params.id);
        req.user.save();

        let requestSent = await User.findById(req.params.id);
        requestSent.friends.push(req.user._id);
        requestSent.save();

        if(req.xhr){
            return res.status(200).json({
                message:"friend added successfully"
            })
        }

        req.flash("success","friend added");
        return res.redirect('/');
    }catch(err){
        console.log(err);
        return res.redirect('back');
    }
} 


module.exports.removeFriend = async function(req,res){
    try{
        await User.findByIdAndUpdate(req.user._id, { $pull: { friends: req.params.id } });
        await User.findByIdAndUpdate(req.params.id, { $pull: { friends: req.user._id } });

        // let friend_relation = Friend.find({$or:[{from: req.user._id,to: req.params.id},{from:req.params.id,to:req.user._id}]});
        // finding and deleting as from and to can be in either way
        await Friend.findOneAndDelete({from: req.user._id,to: req.params.id});        
        await Friend.findOneAndDelete({to: req.user._id,from: req.params.id});

        if(req.xhr){
            return res.status(200).json({
                message:"friend deleted successfully"
            });
        }

        return res.redirect('back');
    }catch(err){
        console.log(err);
        return res.redirect('back');
    }



}