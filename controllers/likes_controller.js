const Comment = require('../models/comments');
const Post = require('../models/posts');
const Like = require('../models/likes');

module.exports.toggleLike = async function(req,res){
    try{
        let likable;
        // for checking whether like is made or removed false means made
        let deleted = false;

        if(req.query.type=="Post"){
            likable = await Post.findById(req.query.id);
        }else{
            likable = await Comment.findById(req.query.id);
        }
        let existingLike = await Like.findOne({
            user:req.user._id,
            likeable:req.query.id,
            onModel:req.query.type
        });
        if(existingLike){
            likable.likes.pull(existingLike._id);
            likable.save();
            existingLike.remove();
            deleted=true;
        }else{
            let newLike = await Like.create({
                user:req.user._id,
                likeable:req.query.id,
                onModel:req.query.type
            });
            likable.likes.push(newLike._id);
            likable.save();
        }
        
        return res.status(200).json({
            message:"request successfull",
            data:{
                deleted:deleted
            }
        })

    }catch(err){
        if(err){ 
            console.log(err);
            return res.status(500).json({
                message:"internal server error in likes"
            });
        }
    }
}