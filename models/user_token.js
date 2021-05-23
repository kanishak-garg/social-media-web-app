const mongoose = require('mongoose');
const crypto = require('crypto');
const tokenSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    accessToken:{
        type:String,
        required:true
    },
    valid:Boolean
},{
    timestamps:true
});

const Token = mongoose.model('Token',tokenSchema);

module.exports = Token;