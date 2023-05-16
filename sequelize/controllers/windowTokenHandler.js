const jwt = require("jsonwebtoken");

const tokenVarify = (req, res) => {
    console.log("varify fun called")
  try {
    const token = req.body.token;
    console.log("req token",token)
    let userData = jwt.verify(token, "abhishek");
    if (userData) {
      res.send({
        status: true,
        entity: "token varified",
      });
    } else {
      res.send({
        status: false,
        entity: "token is missing or invalid",
      });
    }
  } catch (error) {
    console.log(error);
    res.send({
      status: false,
      entity: "token is missing or invalid",
    });
  }
};

module.exports = {tokenVarify};
