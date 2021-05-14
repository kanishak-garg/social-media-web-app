const Comment = require('../models/comments');
const Post = require('../models/posts');
module.exports.create = async function (req, res) {
    //console.log(req.body.content);
    //using async
    try{
    let post = await Post.findById(req.body.post);
    if(post){
       let comment = await Comment.create({
                        content: req.body.content,
                        user: req.user._id,
                        post: req.body.post
                    });
                
        await post.comments.push(comment);
        await post.save();
        req.flash('success',"comment added successfully!!");
        return res.redirect('back');
    }
}catch(err){
    req.flash('error',err);
    return res.redirect('back');
}


    // normal wey of writing
    // Post.findById(req.body.post, function (err, post) {
    //     if (err) { console.log("error in finding post in comments_controller"); return }
    //     if (post) {
    //         Comment.create({
    //             content: req.body.content,
    //             user: req.user._id,
    //             post: req.body.post
    //         }, function (err, comment) {
    //             if (err) { console.log("error in creating the comment"); return; }
    //             post.comments.push(comment);
    //             post.save();
    //             return res.redirect('back');
    //         });
    //     }
    // });
};

module.exports.delete = async function (req, res) {
    try{
    let comment = await Comment.findById(req.params.id);
    let post = await Post.findById(comment.post);

    if(post){
        if (comment && (comment.user == req.user.id || req.user.id == post.user)) {
            let postId = comment.post;
            comment.remove();
            comment.save();
        
            let updatedPost = await Post.findByIdAndUpdate(postId, { $pull: { comments: req.params.id } });
            req.flash('success',"comment deleted successfully!!");
        }else{
            req.flash('error',"You can not delete the comment");
        }
    }
    return res.redirect('back');
}catch(err){
    req.flash('error',err);

}
    
    //  // without async await
    // Comment.findById(req.params.id, function (err, comment) {
    //     if (err) { console.log("error in finding the comment in delete comment"); return; }

    //     Post.findById(comment.post, function (err, post) {
    //         if (err) { console.log("error in finding the post in delete comment"); return; }
    //         if (post) {
    //             if (comment && (comment.user == req.user.id || req.user.id == post.user)) {
    //                 let postId = comment.post;
    //                 comment.remove();
    //                 comment.save();
    //                 Post.findByIdAndUpdate(postId, { $pull: { comments: req.params.id } }, function (err, updatedPost) {
    //                     if (err) { console.log("error in finding the post in delete comment"); return; }
    //                 });
    //                 return res.redirect('back');
    //             }
    //         }
    //     });
    // });
}