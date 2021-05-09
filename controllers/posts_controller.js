const Post = require('../models/posts');
const Comment = require('../models/comments');

module.exports.create = function (req, res) {
    Post.create({
        content: req.body.content,
        user: req.user._id
    }, function (err, post) {
        if (err) { console.log("error in creating the post"); return; }
        return res.redirect('back');
    });
};


module.exports.addComment = function (req, res) {
    //console.log(req.body.content);
    Comment.create({
        content: req.body.content,
        user: req.user._id,
        post: req.query.id
    }, function (err, comment) {
        if (err) { console.log("error in creating the comment"); return; }
        return res.redirect('back');
    });

}