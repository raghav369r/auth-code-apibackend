const express = require("express");
const router = express.Router();
const { Contest } = require("../models/contest");
const Participants = require("../models/participants");
const { jwtDecode } = require("jwt-decode");
require("dotenv").config();

router.get("/", (req, res) => {
  res.status(200).send("DONE Getting");
});

router.get("/join/:urlId", async (req, res) => {
  const token = req.header("x-auth-token");
  if (!token) {
    res.status(401).send("token required");
    return;
  }

  const { _id: userid } = jwtDecode(token);
  if (!userid) res.status(401).send("invalid token");
  const urlId = req.params.urlId;
  let contest;
  try {
    contest = await Contest.findOne({ url: urlId });
    if (contest) {
      const { _id: contest_id } = contest;
      await Participants.updateOne(
        { contest_id: contest_id },
        { $addToSet: { participants: userid } }
      );
      res.status(200).json(contest);
    } else res.status(404).send("Page not found!!");
  } catch (ex) {
    res.status(404).send("Error Processing your request!!");
  }
});

router.post("/create", async (req, res) => {
  //   console.log(req.body);
  const { name, url, questions, start, end ,owner} = req.body;
  let contest = await Contest.findOne({ url });
  //   console.log(contest);
  if (contest) {
    res.status(400).send("Url already exist");
    return;
  }

  try {
    contest = new Contest({
      name: name,
      url: url,
      questions: questions,
      start: start,
      end: end,
      owner:owner,
    });
    const { _id } = await contest.save();
    let participants = new Participants({
      contest_id: _id,
      participants: [],
    }); 
    await participants.save();
    res.status(200).send(`Contest cretaed Sucessfully join at: ${url}`);
  } catch (ex) {
    // console.log("error", ex);
    res.status(400).send(ex);
  }
});

module.exports = router;
