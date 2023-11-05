const express = require("express");
const verifyJwt = require("../omniModules/jwt");
const { users, houses, blog } = require("../omniModules/mongodb");
const { ObjectId } = require("mongodb");
const {
  createUser,
  findUser,
  updateUser,
  addToWhishList,
  blogSearch,
  ProductSearch,
  updateImage,
} = require("../modules/userModules");
const router = express.Router();
const multer = require("multer");
const uploadImage = require("../omniModules/uploadImage");
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
router.get("/", (req, res) => {
  res.send("<h1>welcome user</h1>");
});

router.get("/getUser/:email", findUser);
router.post("/createUser", createUser);
router.get("/blogSearch/:search", blogSearch);
router.get("/productSearch", ProductSearch);
router.put("/updateImage", upload.single("profile"),uploadImage,updateImage);
router.put("/updateUser", updateUser);
router.put("/addToWhishList", addToWhishList);
module.exports = router;
