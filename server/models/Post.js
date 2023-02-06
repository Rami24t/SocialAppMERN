import mongoose from "mongoose";
const { Schema } = mongoose;
const postSchema = new Schema({
        title: {
            type: String,
            required: true
        },
        text: {
            type: String,
            required: true
        },
        postImage: String,
        author: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        likes: [{
            type: Schema.Types.ObjectId,
            ref: 'User'
        }],
        comments: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Comment'
            }
        ]
    },
    {
        timestamps: true
}
)
export default mongoose.model('Post', postSchema)