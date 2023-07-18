import express from "express";
import { login, register } from "../controller/user.js";
const router = express.Router();

//signin
router.post("/login", login);
//register
router.post("/register", register);

export default router;
