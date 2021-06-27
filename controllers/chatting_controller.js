const Message = require('../models/messages');
const chatRoom = require('../models/chatRooms');

module.exports.send_message = async function(req,res){    
    try{
        if (req.xhr){
            console.log('req body',req.body);
            let newMessage = await Message.create({
                    content:req.body.message,
                    user: req.user._id
                });
                await newMessage.populate('user','name email').execPopulate();
                let room = await chatRoom.findOne({name:'codeial'});
                if(!room){
                    room = await chatRoom.create({
                        name:'codeial'
                    });
                }
                await room.messages.push(newMessage);
                room.save();
                return res.status(200).json({
                    data: {
                        newMessage:newMessage
                    },
                    message: "message sent!"
                });
        }
        req.flash('success',"message sent!!");
        return res.redirect('back');
        }catch(err){
            req.flash('error',"message cant be sent");
            return res.redirect('back');
        }
}


