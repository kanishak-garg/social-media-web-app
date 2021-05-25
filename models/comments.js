const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
    content: {
        type: String,
        required: true
    },
    // saving the id of user who posted that comment
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    // saving id of post on which the user commented
    post: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post'
    },
    likes:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Like'
        }
    ]
}, {
    timestamps: true
});

const Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;