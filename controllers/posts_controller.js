const Post = require('../models/posts');
const Comment = require('../models/comments');

module.exports.create = async function (req, res) {
    try{
    let post  =await Post.create({
            content: req.body.content,
            user: req.user._id
        });
        return res.redirect('back');
    }catch(err){
        console.log('error :  ',err);
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
            post.remove();
            await Comment.deleteMany({ post: req.params.id });
        }
        return res.redirect('back');
    }
    }catch(err){
        console.log('error :  ',err);
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

