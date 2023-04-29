require("dotenv").config();
require("./src/configs/database").connect();
const express = require("express");
const auth = require("./src/middlewares/auth");
const app = express();

app.use(express.json());



app.post("/welcome", auth, (req, res) => {
  res.status(200).send("Welcome 🙌 ");
});

module.exports = app;