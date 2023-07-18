import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: String,
  email: String,
  password: String,
  createdAt: {
    type: Date,
    default: new Date().toISOString(),
  },
});

const model = mongoose.model("User", userSchema);
export default model;
