const express = require("express");
const app = express();
app.get("/", (req, resp) => {
  resp.send("api running");
});
app.listen(2000);
