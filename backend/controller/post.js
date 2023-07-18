import Post from "../models/Post.js";
import User from "../models/User.js";
import mongoose from "mongoose";
export const createPost = async (req, res) => {
  if (!req.userID)
    return res
      .status(404)
      .json({ message: "You are not authorized to create post" });
  try {
    const newPost = new Post({
      ...req.body,
      user: req.userID,
    });
    await newPost.save();
    res.json(newPost);
  } catch (error) {
    res.status(500).json(error);
  }
};
export const getPosts = async (req, res) => {
  try {
    const posts = await Post.find().select(["-imageFiles"]).sort("-createdAt");

    if (!posts) return res.status(200).json("No post found");
    res.json(posts);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

export const getPost = async (req, res) => {
  if (!mongoose.isValidObjectId(req.params.id))
    return res.status(404).json("Invalid request");
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json("Post not found");
    res.json(post);
  } catch (error) {
    res.status(500).json(error);
  }
};

export const editPost = async (req, res) => {
  const postId = req.params.id;
  if (!mongoose.isValidObjectId(postId))
    return res.status(404).json("Invalid request");
  try {
    const updatedPost = await Post.findByIdAndUpdate(postId, req.body, {
      new: true,
    });
    res.json(updatedPost);
  } catch (error) {
    res.status(500).json(error);
  }
};
export const deletePost = async (req, res) => {
  const postId = req.params.id;
  if (!mongoose.isValidObjectId(postId))
    return res.status(404).json("Invalid request");
  try {
    const post = await Post.findByIdAndDelete(postId);
    res.json(post);
  } catch (error) {
    res.status(500).json(error);
  }
};
