const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema({
  title: {
    type: String,
  },
  question: {
    type: String,
    required: true,
  },
  exampleip: {
    type: [String],
  },
  exampleop: {
    type: [String],
  },
});

const Contest = mongoose.model(
  "contest",
  new mongoose.Schema({
    name: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
      unique: true,
    },
    questions: {
      type: [questionSchema],
      required: true,
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    start: { type: Date, required: true },
    end: { type: Date, required: true },
  })
);

exports.Contest = Contest;

// const mongoose=require("mongoose");

// const Contest=mongoose.model("contest",new mongoose.Schema(
//     {
//     name:{
//         type:String,
//         required:true,
//     },
//     url:{
//         type:String,
//         required:true,
//         unique:true
//     },
//     questions:{
//         type:object,
//         required:true,
//     },
//     participants:{
//         type:array,
//     },
//     start:Date,
//     end:Date
//     }));

// exports.Contest=Contest;
