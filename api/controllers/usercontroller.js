const { User } = require("../models/index.js");

const getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    res.send({
      status: true,
      entity: users,
    });
  } catch (error) {
    res.send({
      status: false,
      entity: error,
    });
  }
};

const oneUserWithId = async (req, res) => {
  const users = await User.findOne({
    where: {
      id: req.params.id,
    },
  });
  res.send(users);
};

const deleteOneUserWithId = async (req, res) => {
  const targetData = await User.findAll({
    where: { id: req.params.id },
  });
  const users = await User.destroy({
    where: {
      id: req.params.id,
    },
  });
  res.send(`${targetData.name} deleted successfully`);
};

const updateUser = async (req, res) => {
  const users = await User.update(req.body, {
    where: {
      id: req.params.id,
    },
  });
  res.send(users);
};

module.exports = {
  getAllUsers,
  oneUserWithId,
  deleteOneUserWithId,
  updateUser,
};
