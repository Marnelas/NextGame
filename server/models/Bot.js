const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const botSchema = new Schema(
  {
    username: String,
    message : String,
    channelUsername:String,
    command: String
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at"
    }
  }
);

const Bot = mongoose.model("Bot", botSchema);
module.exports = Bot;
