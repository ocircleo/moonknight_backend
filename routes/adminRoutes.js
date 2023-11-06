const express = require("express");
const router = express.Router();
const os = require("os");
const path = require("path");
const multer = require("multer");
const {
  approvePost,
  pendingPost,
  makeAdmin,
  postBlog,
  getUsers,
} = require("../modules/adminModules");
// console.log(os);
const storage = multer.memoryStorage()
const upload = multer
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
router.get("/getUsers", getUsers);
router.get("/pendingPost", pendingPost);
router.put("/approvePost", approvePost);
router.put("/makeAdmin", makeAdmin);
router.post("/postBLog", postBlog);
module.exports = router;
