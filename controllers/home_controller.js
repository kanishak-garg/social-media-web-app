const Post = require('../models/posts');
const User = require('../models/users');
module.exports.home = async function (req, res) {
try{
    let posts = await Post.find({})
    .sort('-createdAt')
        .populate('user')
        .populate('likes')
        .populate({
            path: 'comments',
            populate: {
                path: 'user'
            },
            populate:{
                path:'likes'
            }
        });
        console.log(posts.likes.user);
    let users = await User.find({});
    let friends;    
    if(req.user){
        let currentUser = req.user.populate('friends');
        friends = currentUser.friends;
        console.log(friends.name);
    }
    return res.render('home', {
                    title: "codial",
                    post_list: posts,
                    all_users: users,
                    friends:friends
                });

            }catch(err){
                console.log('error:  ' ,err);
            }
};
