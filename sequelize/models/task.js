const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Task extends Model {
    static associate(models) {
      Task.belongsTo(models.User, { foreignKey: "userId" });
    }
  }

  Task.init(
    {
      userId: {
        type: DataTypes.INTEGER,
        references: {
          model: "Users",
          key: "id",
        },
      },
      taskName: { type: DataTypes.STRING, allowNull: false },
      taskDiscription: {
        type: DataTypes.STRING,
      },
      taskStatus: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "notstart",
      },
    },
    {
      sequelize,
      modelName: "Task",
    }
  );
  return Task;
};
