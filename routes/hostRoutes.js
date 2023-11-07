const express = require("express");
const verifyJwt = require("../omniModules/jwt");
const { users } = require("../omniModules/mongodb");
const path = require("path");
const router = express.Router();
const multer = require("multer");
const uploadImage = require("../omniModules/uploadImage");
const {
  uploadHouseImage,
  postHouse,
  getMyHouses,
  makeHost,
  applyForHost,
} = require("../modules/hostModule");
const storage = multer.memoryStorage();

// const upload = multer({ storage: storage });
const upload = multer({ storage: storage });
// ===== multer =====
router.get("/", (req, res) => {
  res.send("<h1>welcome host</h1>");
});
router.post("/create_host", (req, res) => {});
router.get("/test_html", (req, res) => {
  res.sendFile(path.join(__dirname, "../test_html_files/file.html"));
});
// done == need testing
router.get("/getMyHouses/:email", getMyHouses);
// done == need testing
router.put("/makeHost/:id", makeHost);
router.put("/applyForHost",applyForHost);
// in progress
router.post("/postHouse", postHouse);
// done == need testing
router.post(
  "/uploadImage",
  upload.single("image"),
  uploadImage,
  uploadHouseImage
);

module.exports = router;
