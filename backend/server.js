import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import postRoutes from "./routes/post.js";
import userRoutes from "./routes/user.js";
import cors from "cors";
import responseTime from "response-time";
dotenv.config();

const app = express();

//Middlewares are the core part of express
// It is basically 5 diff version

app.use(express.json({ limit: "50mb" }));
app.use(cors());
app.use(
  responseTime(function (req, res, time) {
    var stat = (req.method + req.url)
      .toLowerCase()
      .replace(/[:.]/g, "")
      .replace(/\//g, "_");

    console.log(stat, time);
  })
);
app.use("/post", postRoutes);
app.use("/user", userRoutes);

app.get("/", (req, res) => {
  res.send("App is running");
});

mongoose
  .connect(process.env.MONGO_URI, {
    useFindAndModify: false,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => app.listen(process.env.PORT || 5000))
  .then(() => console.log("Server running on port 5000"))
  .catch((err) => console.log(err));
