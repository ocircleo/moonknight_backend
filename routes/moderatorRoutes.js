const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.send("<h1>welcome to moderator route</h1>");
});

module.exports = router;
