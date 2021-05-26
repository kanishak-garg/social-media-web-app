const Post = require('../models/posts');
const Comment = require('../models/comments');
const Like = require('../models/likes');
module.exports.create = async function (req, res) {
    try{
    let post = await Post.create({
            content: req.body.content,
            user: req.user._id
        });

        if (req.xhr){
            // if we want to populate just the name of the user (we'll not want to send the password in the API), this is how we do it!
            post = await post.populate('user', 'name').execPopulate();

            return res.status(200).json({
                data: {
                    post: post
                },
                message: "Post created!"
            });
        }

        req.flash('success',"Post published!!");
        return res.redirect('back');
    }catch(err){
        req.flash('error',"Posting was not successfull");
        return res.redirect('back');
    }


        // Post.create({
    //     content: req.body.content,
    //     user: req.user._id
    // }, function (err, post) {
    //     if (err) { console.log("error in creating the post"); return; }
    //     return res.redirect('back');
    // });
};


module.exports.destroy = async function (req, res) {
    try{
    let post = await Post.findById(req.params.id);
    if (post) {
        // .id means converting the _id of object to string
        if (post.user == req.user.id) {      
            // console.log(post);     
            await Like.deleteMany({likeable:post._id});
            for(let comment of post.comments){
                await Like.deleteMany({likeable:comment});
                await Comment.findByIdAndDelete(comment);
            }
            post.remove();
            // await Comment.deleteMany({ post: req.params.id });
            
            if (req.xhr){
                return res.status(200).json({
                    data: {
                        post_id: req.params.id
                    },
                    message: "Post deleted"
                });
            }

            req.flash('success',"post deleted successfully!!");
        }else{
            req.flash('error',"You can not delete this post");
        }

        return res.redirect('back');
    }
    }catch(err){
        req.flash('error',err);
        return res.redirect('back');
    }

    // Post.findById(req.params.id, function (err, post) {
    //     if (err) { console.log("error in finding the post to delete"); return; }
    //     if (post) {
    //         // .id means converting the _id of object to string
    //         if (post.user == req.user.id) {
    //             post.remove();

    //             Comment.deleteMany({ post: req.params.id }, function (err) {
    //                 if (err) { console.log("error deleting coments in posts"); return }
    //                 return res.redirect('back');
    //             })
    //         } else {
    //             return req.redirect('back');
    //         }
    //     }
    // })
}

