import mongoose from "mongoose";
const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      unique: true,
      required: true,
      immutable: true,
    },
    email: {
      type: String,
      unique: true,
      required: function () {
        return !this.gitHubId;
      },
      immutable: !this.gitHubId,
    },
    gitHubId: {
      type: String,
      unique: true,
      required: function () {
        return !this.email;
      },
      immutable: true,
    },
    password: {
      type: String,
      required: function () {
        return !this.gitHubId;
      },
    },
    name: String,
    title: String,
    profileImage: String,
    coverImage: String,
    address: String,
    about: String,
    phone: String,
    facebook: String,
    instagram: String,
    twitter: String,
    github: {
      type: String,
      immutable: this.gitHubId,
    },
    // linkedin: String,
    // website: String,
    likes: [{ type: String, default: [] }],
    gender: String,
    verified: {
      type: Boolean,
      default: false,
    },
  },
  { timeStamps: true }
);
export default mongoose.model("User", userSchema);
