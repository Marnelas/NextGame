const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    username: String,
    password: String,
    email: String,
    accessToken: String,
    refreshToken: String,
    Streamers: [{ type: Schema.Types.ObjectId, ref: "Streamer" }],
    id: String,
    logo: String,
    description: String,
    followers: Number,
    video_banner: String,
    imageUrl: String,
    votes: Number,
    stream_url: String,
    imageUrl: String,
    votes: Number
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at"
    }
  }
);

const User = mongoose.model("User", userSchema);
module.exports = User;
