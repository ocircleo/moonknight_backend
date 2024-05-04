const express = require("express");
const verifyJwt = require("../omniModules/jwt");
const { users, houses, blog } = require("../omniModules/mongodb");
const { ObjectId } = require("mongodb");
const cors = require("cors");

const {
  createUser,
  findUser,
  updateUser,
  addToWhishList,
  blogSearch,
  ProductSearch,
  updateImage,
  contactUs,
  getCard,
  getAllBlog,
  singleBlog,
  removeFromWishList,
  sendMessage,
  myMessage,
  postComment,
  getComment,
  getEstimate,
} = require("../modules/userModules");
const router = express.Router();
router.use(cors());
const multer = require("multer");
const uploadImage = require("../omniModules/uploadImage");
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
router.get("/", (req, res) => {
  res.send("<h1>welcome user</h1>");
});
router.get("/getEstimate", getEstimate);
router.get("/card/:id", getCard);
router.get("/getUser/:email", findUser);
router.post("/createUser", createUser);
router.get("/blogSearch/:search", blogSearch);
router.get("/allBlog", getAllBlog);
router.get("/singleBlog/:id", singleBlog);
router.get("/productSearch", ProductSearch);
router.put("/updateImage", upload.single("profile"), uploadImage, updateImage);
router.put("/updateUser", updateUser);
router.put("/addToWhishList", addToWhishList);
router.put("/removeFromWishList", removeFromWishList);
router.post("/contact", contactUs);
router.post("/sendMessage", sendMessage);
router.get("/myMessage/:mail", myMessage);
router.post("/comment", postComment);
router.get("/comment/:id", getComment);

module.exports = router;
