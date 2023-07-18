import jwt from "jsonwebtoken";

const auth = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) return res.status(404).json("Token not found");
  try {
    const token = authorization.split(" ")[1];
    console.log(token);
    if (!token)
      return res.status(404).json({ message: "Token not formatted properly" });
    const user = jwt.verify(token, process.env.SECRET_KEY);
    if (!user) return res.status(404).json({ message: "Token is invalid" });
    req.userID = user.id;
    next();
  } catch (error) {
    res.status(500).json(error);
  }
};

export default auth;
