const mongoose = require("mongoose");

const problem = new mongoose.Schema({
  problem_id: {
    type: mongoose.Schema.types.ObjectId,
    required: true,
  },
  time_taken: mongoose.Schema.types.Number,
});

const Contest_performance = mongoose.model(
  "contest_performance",
  new mongoose.Schema({
    contest_id: mongoose.Schema.types.ObjectId,
    user_id: mongoose.Schema.types.ObjectId,
    solved_problems: [problem],
    wrong_submissions: mongoose.Schema.Types.Number,
    score: mongoose.Schema.Types.Number,
  })
);

module.exports = Contest_performance;
