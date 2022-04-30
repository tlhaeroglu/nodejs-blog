const express = require("express");
const app = express();
const session = require("express-session");
const path = require("path");
const cors = require("cors");
const fs = require("fs");
require("dotenv").config();

const homeRouter = require("./routes/homeRouter.js");
const adminRouter = require("./routes/adminRouter.js");
const postRouter = require("./routes/postRouter.js");

app.set("view engine", "ejs");

// Use no-cache system for all requests
app.use(function (req, res, next) {
  res.set(
    "Cache-Control",
    "no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0"
  );
  next();
});

app.use(
  session({
    secret: "S3cr3t",
    resave: false,
    saveUninitialized: true,
  })
);
app.use(express.urlencoded({ extended: true }));
app.use(express.json({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.use(
  cors({
    origin: "http://localhost:5000",
  })
);

app.use(homeRouter);
app.use("/admin", adminRouter);
app.use("/post", postRouter);

/*const user = require('./models/User.js');
let user1 = new user(1, 'user1', 'user1', 'user1', new Date());

const post = require('./models/Post.js');
let post1 = new post(1, 'post1', 'post1', user1, new Date());
console.log(post1);*/

app.listen(process.env.PORT || 5000, () => {
  console.log("------ http://localhost:5000/ ------");
});
