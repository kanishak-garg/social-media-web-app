const Post = require('../models/posts');

module.exports.home = function (req, res) {
    //populate the user before hand check in mongoose documentarion (populate)
    Post.find({}).populate('user').exec(function (err, posts) {

        if (err) { console.log("error in finding posts"); return }
        return res.render('home', {
            title: "codial",
            post_list: posts
        });
    });
};
