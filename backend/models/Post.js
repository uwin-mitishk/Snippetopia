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
      const estOffset = -4 * 3600000; // UTC-4 (EST) offset in milliseconds
      const estTimeInMilliseconds = utc + estOffset;
      const estDate = new Date(estTimeInMilliseconds);
      const estISOString = estDate.toISOString();
      return estISOString;

    },
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

const model = mongoose.model("Post", PostSchema);

export default model;
