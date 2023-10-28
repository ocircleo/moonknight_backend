const express = require("express");
const verifyJwt = require("../omniModules/jwt");
const { users } = require("../omniModules/mongodb");
const router = express.Router();

router.get("/", (req, res) => {
  res.send("<h1>welcome host</h1>");
});
router.post("/create_host",verifyJwt, (req, res) => {});

module.exports = router;