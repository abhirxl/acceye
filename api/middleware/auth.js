const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
  try {
    const token = req.headers["x-access-token"];
    const userData = jwt.verify(token, "abhishek");
    req.userIdFromReq = userData.id;
    next();
  } catch (error) {
    console.log("error in auth page",error);
    res.send({
      status: false,
      entity: "token is missing or invalid",
    });
  }
};

module.exports = auth;
