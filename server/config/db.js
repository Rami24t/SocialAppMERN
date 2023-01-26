import mongoose from "mongoose";

export default function () {
    try {
        mongoose.set('strictQuery', false);
        mongoose.connect(process.env.DB_URI)
        console.log("connecting to db")
    } catch (error) {
        console.log("connection error: ", error.message)
        process.exit(1)
    }
}