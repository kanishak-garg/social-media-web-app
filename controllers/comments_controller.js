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