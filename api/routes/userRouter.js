const express = require("express");
const userRouter = express.Router();
const userController = require("../controllers/usercontroller.js");
const auth = require("../middleware/auth.js");

userRouter.use((req, res, next) => {
  next();
});

// //               -----------------------------------------------
// //   ######---->|     All router start from "/users" here     |<----######
// //               -----------------------------------------------

// userRouter.get("/", userController.getAllUsers);
userRouter.get("/:id", auth, userController.oneUserWithId);
userRouter.delete("/:id", userController.deleteOneUserWithId);
userRouter.patch("/:id", auth, userController.updateUser);



module.exports = userRouter;
