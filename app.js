const express = require("express");
const mongoose = require("mongoose");
const Connectdb = require("./db/ConnectDb");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
var cors = require("cors");

const app = express();
const web = require("./routes/web");

dotenv.config({
  path: ".env",
});
app.use(bodyParser.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/api/v1", web);
Connectdb();

app.listen(process.env.PORT, () => {
  console.log(`localhost:${process.env.PORT}`);
});
