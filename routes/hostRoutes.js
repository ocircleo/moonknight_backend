const express = require("express");
const verifyJwt = require("../omniModules/jwt");
const { users } = require("../omniModules/mongodb");
const path = require("path");
const router = express.Router();
const multer = require("multer");

// ===== multer =====
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    const name = Date.now() + "-" + file.originalname;
    cb(null, name);
  },
});

const upload = multer({ storage: storage });
// ===== multer =====
router.get("/", (req, res) => {
  res.send("<h1>welcome host</h1>");
});
router.post("/create_host", verifyJwt, (req, res) => {});
router.get("/test_html", (req, res) => {
  res.sendFile(path.join(__dirname, "../test_html_files/file.html"));
});
router.post("/upload_images", upload.single("images"), (req,res) => {
  console.log('file is uploaded')
  res.send('<h1>file is uploaded</h>')
});

module.exports = router;
