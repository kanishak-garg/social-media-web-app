const Post = require('../models/posts');
const User = require('../models/users');
module.exports.home = async function (req, res) {
// better method as it provide cleaner code
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

    let users = await User.find({});

    return res.render('home', {
                    title: "codial",
                    post_list: posts,
                    all_users: users
                });

            }catch(err){
                console.log('error:  ' ,err);
            }
    // general method of executing query
    // //populate the user before hand check in mongoose documentarion (populate)
    // Post.find({})
    //     .populate('user')
    //     .populate({
    //         path: 'comments',
    //         populate: {
    //             path: 'user'
    //         }
    //     })
    //     .exec(function (err, posts) {
    //         if (err) { console.log("error in finding posts(home controller)"); return }
    //         User.find({},function(err,users){
    //             if (err) { console.log("error in finding users (home controller"); return }
    //             return res.render('home', {
    //                 title: "codial",
    //                 post_list: posts,
    //                 all_users: users
    //             });
    //         })
           
    //     });
};
