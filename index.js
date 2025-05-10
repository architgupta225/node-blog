const express = require("express");
const path = require("path");
const dotenv = require("dotenv");
const connectToMongo = require("./connect");
const cookieParser = require("cookie-parser");

dotenv.config();

const Blog = require("./models/blog")

const userRoute = require("./routes/user");
const blogRoute = require("./routes/blog");

const { checkForAuthenticationCookie } = require("./middleware/authentication");

connectToMongo(process.env.MONGO_URL);

const app = express();
const PORT = 8000;

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(checkForAuthenticationCookie("token"));
app.use(express.static(path.resolve('./public')))

app.get("/", async (req, res) => {
  const allBlogs = await Blog.find({})
  res.render("home", {
    user: req.user,
    blogs: allBlogs
  });
});

app.use("/user", userRoute);
app.use("/blog", blogRoute);

app.listen(PORT, () => console.log(`Server started on PORT: ${PORT}`));
