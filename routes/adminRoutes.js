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
  blockUser,
  denyPost,
  getEmail,
  deleteEmail,
} = require("../modules/adminModules");
const uploadImage = require("../omniModules/uploadImage");
// console.log(os);
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
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
//done working
router.get("/getUsers/:type", getUsers);
//done untested
router.get("/pendingPost", pendingPost);
//done untested
router.put("/approvePost/:id", approvePost);
//done untested
router.put("/denyPost/:id", denyPost);
// done untested
router.put("/makeAdmin", makeAdmin);
//done untested
router.put("/blocUser/:id", blockUser);
//done tested
router.post("/postBLog", upload.single("image"), uploadImage, postBlog);
//done untested
router.get("/getEmails", getEmail);
router.delete("deleteEmail/:id", deleteEmail);
module.exports = router;
