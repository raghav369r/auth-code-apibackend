const express=require("express");
const cors = require('cors');
const mongoose=require("mongoose");
const bodyParser = require('body-parser');
const home=require("./routes/home");
const user=require("./routes/user");
const auth=require("./routes/auth");
const code=require("./routes/code")

const app=express();


app.use(cors());
app.use(express.json()); // This line is crucial for parsing JSON request bodies
app.use(bodyParser.urlencoded({ extended: true }));

// app.use("/",home);
app.use("/user",user)
app.use("/auth",auth);
app.use("/code",code);


mongoose.connect("mongodb://localhost/playground")
    .then(()=>console.log("Connected to mongoDb...."))
    .catch((e)=>console.log(e));

const port=3000;
app.listen(port,(req,res)=>{
    console.log(`server running in port: ${port}`);
});
