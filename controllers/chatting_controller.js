const Message = require('../models/messages');
const chatRoom = require('../models/chatRooms');

module.exports.send_message = async function(req,res){    
    try{
       let newMessage = await Message.create({
            content:req.body.message,
            user: req.user
        });
        let room = await chatRoom.findOne({name:'codeial'});
        if(!room){
            room = await chatRoom.create({
                name:'codeial'
            });
        }
        await room.messages.append(newMessage);

        req.flash('success',"message sent!!");
        return res.redirect('back');
        }catch(err){
            req.flash('error',"message cant be sent");
            return res.redirect('back');
        }
   
}