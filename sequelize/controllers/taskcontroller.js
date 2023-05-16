const { Task, User } = require("../models/index.js");

const getAllTasks = async (req, res) => {
  const targetUserId = req.userIdFromReq;
  let tasks = await Task.findAll({
    where: { userId: targetUserId },
    
    // attributes: ["taskName", "taskDiscription"],
    // include: [
    //   {
    //     model: User,
    //     attributes: ["name", "number"],
    //   },
    // ],
  });
  res.send(tasks);
};

const taskWithId = async (req, res) => {
  // let tasks = await Task.findAll({
  //   where: { id: req.params.id },
  // });
  // res.send(tasks);
  res.status(200);
};

const addTask = async (req, res) => {
  const targetUserId = req.userIdFromReq;
  const newTaskData = {
    userId: targetUserId,
    taskName: req.body.taskName,
    taskDiscription: req.body.taskDiscription,
  };
  const newTask = await Task.create(newTaskData);
  res.send(`${newTask.taskName} added to databse`);
};

const deleteTaskWithId = async (req, res) => {
  const reqestedId = req.params.id;
  const targetData = await Task.findAll({
    where: { id: reqestedId },
  });
  const targetedTaskName = targetData[0].dataValues.taskName;
  await Task.destroy({
    where: {
      id: reqestedId,
    },
  });
  // console.log("values", targetData[0].dataValues.taskName);
  res.send(`task name "${targetedTaskName}" deleted successfully`);
};

const updateTask = async (req, res) => {
  const targetUserId = req.userIdFromReq;
  const task = await Task.update(
    { ...req.body },
    {
      where: {
        id: req.params.id,
        userId: targetUserId,
      },

      plain: true,
    }
  );
  res.send(task);
};

module.exports = {
  getAllTasks,
  taskWithId,
  addTask,
  deleteTaskWithId,
  updateTask,
};
