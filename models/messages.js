const mongoose = require('mongoose');

const MessageSchema = new mongoose.Schema({
    content:{
        type:String,
        required:true
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    }
},{
    timestamps:true
})

const Message = mongoose.model('Message',MessageSchema);

module.exports = Message;