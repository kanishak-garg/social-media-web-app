const Post = require('../../../models/posts');
const Comment = require('../../../models/comments');

module.exports.index = async function(req,res){
        let posts = await Post.find({})
        .sort('-createdAt')
            .populate('user').select("-password")
            .populate({
                path: 'comments',
                populate: {
                    path: 'user',
                    select: '-password'
                }
            });
 
        return res.status(200).json({
            message:"list of posts",
            posts:posts
        });
}

module.exports.destroy = async function(req,res){
    try{
    let post = await Post.findById(req.params.id);
    if(post.user == req.user.id){
            post.remove();
            Comment.deleteMany({ post: req.params.id });
            return res.status(200).json({
                message:"post and associated comments deleted"
            });
    }else{
        return res.status(401).json({
            message:"you cannot delete this post"
        });
    }
    }catch(err){
        console.log("*********",err);
        return res.status(200).json({
            message:"internal server error"
        });
    }
}
    
    