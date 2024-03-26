const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
require('dotenv').config();
const home = require("./routes/home");
const user = require("./routes/user");
const auth = require("./routes/auth");
const code = require("./routes/code");

const app = express();

app.use(cors());
app.use(express.json()); // This line is crucial for parsing JSON request bodies
app.use(bodyParser.urlencoded({ extended: true }));

// app.use("/",home);
app.use("/user", user);
app.use("/auth", auth);
app.use("/code", code);

const uri = process.env.Connection_String;
mongoose
  .connect(uri, {})
  .then(() => console.log("Connected to MongoDB Atlas"))
  .catch((error) => {
    console.log("Could not connect to MongoDB Atlas");
    console.log(error);
  });

// mongoose.connect("mongodb://localhost/playground")
//     .then(()=>console.log("Connected to mongoDb...."))
//     .catch((e)=>console.log(e));

const port = 3010;
app.listen(port, (req, res) => {
  console.log(`server running in port: ${port}`);
});
