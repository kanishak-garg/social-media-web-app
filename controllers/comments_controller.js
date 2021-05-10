const Comment = require('../models/comments');
const Post = require('../models/posts');
module.exports.create = function (req, res) {
    //console.log(req.body.content);
    Post.findById(req.body.post, function (err, post) {
        if (err) { console.log("error in finding post in comments_controller"); return }
        if (post) {
            Comment.create({
                content: req.body.content,
                user: req.user._id,
                post: req.body.post
            }, function (err, comment) {
                if (err) { console.log("error in creating the comment"); return; }
                post.comments.push(comment);
                post.save();
                return res.redirect('back');
            });
        }
    });
};

module.exports.delete = function (req, res) {
    Comment.findById(req.params.id, function (err, comment) {
        if (err) { console.log("error in finding the comment in delete comment"); return; }

        Post.findById(comment.post, function (err, post) {
            if (err) { console.log("error in finding the post in delete comment"); return; }
            if (post) {
                if (comment && (comment.user == req.user.id || req.user.id == post.user)) {
                    let postId = comment.post;
                    comment.remove();
                    comment.save();
                    Post.findByIdAndUpdate(postId, { $pull: { comments: req.params.id } }, function (err, post) {
                        if (err) { console.log("error in finding the post in delete comment"); return; }
                    });
                    return res.redirect('back');
                }
            }
        });
    });
}