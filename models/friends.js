const mongoose = require('mongoose');

const friendSchema = new mongoose.model({
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
    timestamps:true
});

const Friend = mongoose.model('Friend',friendSchema);

module.exports = Friend;