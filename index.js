const express = require("express");
const app = express();
const router = express.Router();
const mongoose = require("mongoose");
const config = require("./config/database");
const path = require("path");
const authentication = require("./routes/authentication")(router);
const bodyParser = require("body-parser");

mongoose.Promise = global.Promise;
mongoose.connect(config.uri, { useUnifiedTopology: true, useNewUrlParser: true }, err => {
  if (err) console.log("Eror in connection" + err);
  else {
    console.log("Secret : " + config.secret);
    console.log("Connection successed  " + config.db);
  }
});
mongoose.set("useCreateIndex", true);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(__dirname + "/client/dist/client/"));
app.use("/authentication", authentication);

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname + "/client/dist/client/index.html"));
});

app.listen(3000, () => {
  console.log("Listening to port 3000");
});
