const express = require("express");
const taskRouter = express.Router();
const taskController = require("../controllers/taskcontroller.js");
const auth = require("../middleware/auth.js");

taskRouter.use((req, res, next) => {
  next();
});

// //               -----------------------------------------------
// //   ######---->|     All router start from "/tasks" here     |<----######
// //               -----------------------------------------------

taskRouter.get("/", (req, res) => {
  res.send("task homepage");
});

taskRouter.post("/add", auth, taskController.addTask);
taskRouter.get("/all",auth, taskController.getAllTasks);
taskRouter.get("/find/:id", auth, taskController.taskWithId);
taskRouter.put("/update/:id", auth, taskController.updateTask);
taskRouter.delete("/delete/:id", auth, taskController.deleteTaskWithId);

module.exports = taskRouter;
