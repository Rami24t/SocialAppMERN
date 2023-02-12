import mongoose from "mongoose";
const { Schema } = mongoose;
const commentSchema = new Schema({
    text: {
        type: String,
        required: true
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    comments: [{
        type: Schema.Types.ObjectId,
        ref: 'Comment',
        default: []
}],
    likes: [{
        type: Schema.Types.ObjectId,
        ref: 'User',
        default: []
    }],
}, {
    timestamps: true
})

export default mongoose.model('Comment', commentSchema)

