const express = require("express");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

const port = 3000;

// // ---> this is router homepage <--- // //
app.use("/", require("./routes/index.js"));

// // sequelize file imported(models file)
require("./models/index");

app.listen(port, () => {
  console.log(`App is running on : http://localhost:${port}`);
});
