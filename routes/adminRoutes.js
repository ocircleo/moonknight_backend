const express = require("express");
const router = express.Router();
const os = require("os");
const path = require("path");
// console.log(os);

let data = {
  arch: os.arch(),
  platform: os.platform(),
  cpus: os.cpus(),
  freemem: os.freemem(),
  totalmem: os.totalmem(),
  type: os.type(),
  paralism: os.availableParallelism(),
  userInfo: os.userInfo(),
  endianness: os.endianness(),
  machine: os.machine(),
  // storage: driveState.available / 1024 / 1024 / 1024,
};
// console.log(data);
router.get("/", (req, res) => {
  res.send("<h1>welcome to admin route</h1>");
});
router.get("/status", (req, res) => {
  res.send(JSON.stringify(data));
});
router.get("/status_info", (req, res) => {
  res.sendFile(path.join(__dirname, "../test_html_files/status.html"));
});

module.exports = router;
