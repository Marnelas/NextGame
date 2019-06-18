const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const userSchema = new Schema(
  {
    username: String,
    password: String,
    email:String,
    id: String,
    logo:String,
    description: String,
    followers: Number,
    video_banner: String,
    imageUrl: String,
    votes: Number,
    stream_url:String
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at"
    }
  }
);



const Streamer = mongoose.model('Streamer', userSchema);
module.exports = Streamer;
