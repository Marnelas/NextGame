const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const videoSchema = new Schema(
  {
    title: String,
    url: String,
    language:String,
    game:String,
    recorded_at:String,
    preview:String,

  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at"
    }
  }
);

const Videos = mongoose.model("Videos", videoSchema);
module.exports = Videos;
