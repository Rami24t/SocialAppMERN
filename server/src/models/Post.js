import mongoose from "mongoose";
const { Schema } = mongoose;
const postSchema = new Schema({
        title: {
            type: String,
            required: true
        },
        text: {
            type: String,
        },
        postImage: String,
        author: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        likes: [{
            type: Schema.Types.ObjectId,
            ref: 'User',
            default: []
        }],
        comments: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Comment',
                default: []
            }
        ]
    },
    {
        timestamps: true
}
)
export default mongoose.model('Post', postSchema)