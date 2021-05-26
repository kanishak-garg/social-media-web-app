const mongoose = require('mongoose');

const friendSchema = new mongoose.Schema({
    from:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    to:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    }
},{
    
});

const Friend = mongoose.model('Friend',friendSchema);

module.exports = Friend;