import express from "express";
import auth from "../middleware/auth.js";
import {
  getPosts,
  createPost,
  getPost,
  editPost,
  deletePost,
} from "../controller/post.js";

const router = express.Router();

router.post("/add", auth, createPost);
router.get("/get", getPosts);
router.get("/get/:id", getPost);
router.post("/edit/:id", auth, editPost);
router.post("/delete/:id", auth, deletePost);

export default router;
