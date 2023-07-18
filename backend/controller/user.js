import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const tokenGenerator = (data) => {
  const token = jwt.sign(data, process.env.SECRET_KEY, { expiresIn: "30d" });
  return token;
};

export const register = async (req, res) => {
  const { username, email, password, confirmPassword } = req.body;
  try {
    //TODO: check wether the user already exist using username/email

    const checkExistance1 = await User.findOne({ email: email.trim() });
    const checkExistance2 = await User.findOne({ username: username.trim() });
    if (checkExistance1 || checkExistance2)
      return res
        .status(403)
        .json({ message: "User / Username already exists" });
    //TODO: validate every field
    //TODO: check if the password matches confirm password
    if (password !== confirmPassword)
      return res.status(401).json({ message: "Password does not match" });
    //TODO: password encrypt
    const hashedPassword = await bcrypt.hash(password, 12);
    //TODO: add user into database
    const emailToLower = email.toLowerCase();
    const newUser = new User({
      username,
      email: emailToLower,
      password: hashedPassword,
    });
    const user = await newUser.save();
    console.log("stored");

    //TODO: create token and send to frontend, with id, email ,username
    const token = tokenGenerator({ id: user._id, username, email });
    res.json({
      id: user._id,
      username,
      email,
      token,
    });
  } catch (error) {
    res.status(500).json(error);
  }
};
export const login = async (req, res) => {
  const { email, password } = req.body;
  const emailToLower = email.toLowerCase();
  try {
    //TODO: verify that user already exist or not using email id
    const user = await User.findOne({ email: emailToLower.trim() });
    if (!user) return res.status(404).json({ message: "User does not exist" });
    //TODO: check the password
    const passwordChecker = await bcrypt.compare(password, user.password);
    if (!passwordChecker)
      return res.status(404).json({ message: "Wrong credintials" });
    //TODO: create token and send to frontend, with id, email ,username
    const token = tokenGenerator({
      id: user._id,
      username: user.username,
      email,
    });
    res.json({
      id: user._id,
      username: user.username,
      email,
      token,
    });
  } catch (error) {
    res.status(500).json(error);
  }
};
