const express = require("express");
require("./dataBase/config");
const users = require("./dataBase/User");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

app.post("/register", async (req, resp) => {
  console.log(req.body);
  let user = new users(req.body);
  let result = await user.save();
  resp.send(result);
});

app.listen(1200);
