import mongoose from "mongoose";

const PostSchema = mongoose.Schema({
  title: String,
  description: String,
  tags: [String],
  imageFiles: [Object],
  createdAt: {
    type: String,
    default: () => {
      const d = new Date();
      const utc = d.getTime() + d.getTimezoneOffset() * 60000;
      const nd = new Date(utc + 3600000 * +5.5);
      var ist = nd.toISOString();
      return ist;
    },
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

const model = mongoose.model("Post", PostSchema);

export default model;
