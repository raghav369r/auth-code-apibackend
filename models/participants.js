const mongoose = require("mongoose");

const Participants = mongoose.model(
  "participants",
  new mongoose.Schema({
    contest_id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true, // Use ObjectId type for participants
      unique: true,
    },
    participants: {
      type: [mongoose.Schema.Types.ObjectId], // Use ObjectId type for participants
    },
  })
);

module.exports = Participants;
