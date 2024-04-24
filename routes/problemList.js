const express = require("express");
const router = express.Router();
const axios = require("axios");
var cors = require("cors");

const { PROBLEMLIST_URL } = require("../utils/constants");
router.get("/list", async (req, res) => {
  const { offset, limit } = req.query;
  var myHeaders = new Headers();
  myHeaders.append(
    "Cookie",
    "hackerrank_mixpanel_token=28a2b911-7e2f-4749-a869-9362e5c4cdd5; hrc_l_i=F"
  );

  var requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };

  fetch(
    `https://www.hackerrank.com/rest/contests/master/tracks/data-structures/challenges?offset=${offset}&limit=${limit}`,
    requestOptions
  )
    .then((response) => response.json())
    .then((result) => res.status(200).send(result))
    .catch((error) =>
      res.status(400).send({ error: "unable to make request to hacker rank" })
    );
});

router.get("/problem/:slug", async (req, res) => {
  const { slug } = req.params;
  var myHeaders = new Headers();
  myHeaders.append(
    "Cookie",
    "hackerrank_mixpanel_token=28a2b911-7e2f-4749-a869-9362e5c4cdd5; hrc_l_i=F"
  );

  var requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };

  fetch(
    `https://www.hackerrank.com/rest/contests/master/challenges/${slug}/`,
    requestOptions
  )
    .then((response) => response.json())
    .then((result) => res.status(200).send(result))
    .catch((error) =>
      res.status(400).send({ error: "unable to make request to hacker rank" })
    );
});

module.exports = router;
