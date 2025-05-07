const express = require("express");
const path = require("path");
const dotenv = require("dotenv");
const connectToMongo = require("./connect");
const cookieParser = require("cookie-parser");

dotenv.config();

const userRoute = require("./routes/user");
const { checkForAuthenticationCookie } = require("./middleware/authentication");

connectToMongo(process.env.MONGO_URL);

const app = express();
const PORT = 8000;

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(checkForAuthenticationCookie("token"));

app.get("/", (req, res) => {
  res.render("home" , {
    user: req.user
  });
});

app.use("/user", userRoute);

app.listen(PORT, () => console.log(`Server started on PORT: ${PORT}`));
