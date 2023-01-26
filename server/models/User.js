import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: true,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    image: String,
    address: String,
    age: Number,
    hobbies: [String],
    gender: String,
    verified: {
        type: Boolean,
        default: false
    }
}, {timeStamps: true})
export default mongoose.model('User', userSchema)