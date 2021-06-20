const mongoose = require('mongoose');

const chatSchema = new mongoose.Schema({
    chatRoomName:{
        type:String,
        required:true
    },
    messages: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Message'
        }
    ],
    members: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }
    ]
})