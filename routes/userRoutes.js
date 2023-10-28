const express = require("express");
const verifyJwt = require("../omniModules/jwt");
const { users } = require("../omniModules/mongodb");
const router = express.Router();

router.get("/", (req, res) => {
  res.send("<h1>welcome user</h1>");
});
router.post("/create_user", (req, res) => {});
//testing not verified
router.post("/user", verifyJwt, async (req, res) => {
  const decodedEmail = req.decoded.user;
  const requestEmail = req.body.email;

  if (decodedEmail != requestEmail) {
    res.status(401).send({ error: true, message: "unauthorized access" });
  }
  const newUser = await users.findOne(requestEmail);
  if (!newUser) {
    const inserting = await users.insertOne(requestEmail);
    res.send(inserting)
  }
  res.send(newUser);
});
module.exports = router;
