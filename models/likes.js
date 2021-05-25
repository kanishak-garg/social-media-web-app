const mongoose = require('mongoose');

const LikeSchema = new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    //like can be on post or comment so defining dynamic type
    likeable:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        refPath:'onModel'
    },
    //enum can be empty it will mean any type of data specify post and comment means only these type of data
    onModel:{
        type:String,
        required:true,
        enum:['Post','Comment']
    }
},{
    timestamps:true
})

const Like = mongoose.model('Like',LikeSchema);

module.exports = Like;