const mongoose = require("mongoose");

const User_problems = mogoose.model(
  "user_problems",
  new mongoose.Schema({
    user_id: mongoose.Schema.Types.ObjectId,
    problem_id:mongoose.Schema.Types.ObjectId,
    c_code:String,
    cpp_code:String,
    py_code:String,
    solved_in:[String],
})
);

module.exports=User_problems;