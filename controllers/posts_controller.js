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


module.exports.destroy = function (req, res) {
    Post.findById(req.params.id, function (err, post) {
        if (err) { console.log("error in finding the post to delete"); return; }
        if (post) {
            // .id means converting the _id of object to string
            if (post.user == req.user.id) {
                post.remove();

                Comment.deleteMany({ post: req.params.id }, function (err) {
                    if (err) { console.log("error deleting coments in posts"); return }
                    return res.redirect('back');
                })
            } else {
                return req.redirect('back');
            }
        }
    })
}

