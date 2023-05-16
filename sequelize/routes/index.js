const express = require("express");
const app = express.Router();
const loginController = require("../controllers/loginController.js");
const windowTokenHandler = require("../controllers/windowTokenHandler.js");

app.use((req, res, next) => {
  next();
});

// //              |-----------------------------------------------|
// //   ######---->|     All router start from "/" (home) here     |<----######
// //              |-----------------------------------------------|

// // https://localhost:3000/...

app.get("/", (req, res) => {
  res.send("hello this is API homepage , welcome");
});

// this api receive token and varify
app.post("/userTokenVarify", windowTokenHandler.tokenVarify);

// // add user in databse and login from database
app.post("/add", loginController.addUser);
app.post("/login", loginController.loginUser);
app.post("/recoverPassword", loginController.recoverPassword);

app.use("/users", require("./userRouter"));
app.use("/tasks", require("./taskRouter"));

module.exports = app;
