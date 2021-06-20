const mongoose = require('mongoose');

const chatRoomSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    messages: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Message'
        }
    ],
},{
    timestamps:true
});

const chatRoom = mongoose.model('chatRoom', chatRoomSchema);

module.exports = chatRoom;