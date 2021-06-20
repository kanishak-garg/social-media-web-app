const Post = require('../models/posts');
const User = require('../models/users');
const ChatRoom = require('../models/chatRooms');
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
    let users = await User.find({});
    let friends;   
    let room 
    if(req.user){
        let currentUser = await User.findById(req.user._id).populate('friends');
        friends = currentUser.friends;

        room = await ChatRoom.findOne({name:'codeial'}).populate('messages');
        if(!room){
            room = await ChatRoom.create({
                name:'codeial'
            });
        }
    }

    return res.render('home', {
                    title: "codial",
                    post_list: posts,
                    all_users: users,
                    friends:friends,
                    chat_room:room
                });

            }catch(err){
                console.log('error:  ' ,err);
            }
};
