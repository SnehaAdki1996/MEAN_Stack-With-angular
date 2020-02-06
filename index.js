const express = require("express");
const app = express();
const mongoose = require("mongoose");
const config = require("./config/database");
const path = require("path");

mongoose.Promise = global.Promise;
mongoose.connect(config.uri, { useUnifiedTopology: true, useNewUrlParser: true }, err => {
  if (err) console.log("Eror in connection" + err);
  else {
    console.log("Secret : " + config.secret);
    console.log("Connection successed  " + config.db);
  }
});
app.use(express.static(__dirname + "/client/dist/client/"));
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname + "/client/dist/client/index.html"));
});

app.listen(3100, () => {
  console.log("Listening to port 3100");
});
