const db = require("../models/index");
const User = db.User;
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const addUser = async (req, res) => {
  try {
    const newUserEmail = await User.findOne({
      where: { email: req.body.email },
    });

    if (!newUserEmail) {
      const salt = await bcrypt.genSalt(10);
      const reqData = {
        name: req.body.name,
        email: req.body.email,
        number: req.body.number,
        password: await bcrypt.hash(req.body.password, salt),
      };
      const newUser = await User.create(reqData);

      res.send({
        status: true,
        entity: newUser,
      });
    } else {
      res.send({
        status: false,
        entity: "email already added",
      });
    }
  } catch (error) {
    // console.log("error in adding user", error);
    res.send({
      status: false,
      entity: "error in adding user",
      error,
    });
  }
};

const loginUser = async (req, res) => {
  // pass user detail in json format
  // { "email": "sample@gmail.com" , "password" : "sample"}
  try {
    const user = await User.findOne({ where: { email: req.body.email } });
    if (user) {
      const passwordValid = await bcrypt.compare(
        req.body.password,
        user.password
      );
      if (passwordValid) {
        console.log("test passowrd", passwordValid);

        token = jwt.sign(
          { id: user.id, email: user.email, name: user.name },
          "abhishek"
        );
        res.send({
          status: true,
          entity: {
            id: user.id,
            email: user.email,
            name: user.name,
            token,
          },
        });
      } else {
        res.send({
          status: false,
          entity: "Incorrect password",
        });
      }
    } else {
      res.send({
        status: false,
        entity: "Invalid email",
      });
    }
  } catch (error) {
    res.send({
      status: false,
      entity: "error in login cotrolller",
      error,
    });
  }
};

const recoverPassword = async (req, res) => {
  try {
    const user = await User.findOne({
      where: { email: req.body.recoveryEmail },
    });
    if (user) {
      const password = user.password;
      // // get original password and send
      // const passwordValid =user.password
      res.send({
        status: true,
        entity: password,
      });
    } else {
      res.send({
        status: false,
        entity: "Invalid email or user not found",
      });
    }
  } catch (error) {
    res.send({
      status: false,
      entity: "error in login cotrolller",
      error,
    });
  }
};

module.exports = {
  addUser,
  loginUser,
  recoverPassword,
};
