const { ObjectId } = require("mongodb");
const { users } = require("../omniModules/mongodb");

const findUser = async (req, res, next) => {
  const result = await users.findOne({ email: req.params.email });
  res.send(result);
};
const createUser = async (req, res, next) => {
  const result = await users.findOne({ email: req.body.email });
  if (result == null) {
    const newUser = {
      name: req.body.name || "unkown",
      email: req.body.email,
      role: "user",
      imageUrl: req.body.imageUrl || "Unknown",
      phone: req.body.phoneNumber || "unknown",
      city: "add region",
      region: "add region",
      additional: "add location",
      Wishlist: [],
      Comments: [], //
      History: [], //
      Verification: "Un Verified",
      Verified: false,
      Age: "unknown",
      currentStatus: "Unkonwn",
    };
    const newResult = await users.insertOne(newUser);
  } else {
    res.send(result);
  }
};
// need to be updated
const updateUser = async (req, res, next) => {
  const body = req.body;
  const email = req.body.email;
  const newUser = {
    name: "unkown nsf",
    email: req.body.email,
    role: "user",
    imageUrl: req.body.imageUrl || "Unknown",
    phone: req.body.phoneNumber || "unknown",
    city: "add region",
    region: "add region",
    additional: "add location",
    wishlist: [],
    comments: [], //
    history: [], //
    verification: "Un Verified",
    verified: false,
    age: "unknown",
    currentStatus: "Unkonwn",
  };
  delete body.email;
  console.log(email);
  for (let ele in body) {
    newUser[ele] = body[ele];
  }
  res.send({ name: "| hello Mello |" });
};
const addToWhishList = async (req, res, next) => {
  const id = req.body.id;
  const userId = req.body.userId;
  const result = await users.updateOne(
    { _id: new ObjectId(userId) },
    { $push: { Wishlist: id } }
  );
};
const blogSearch = async (req, res, next) => {
  const text = req.params.search;
  const result = await blog
    .find({ title: { $regex: text, $options: "i" } })
    .toArray();
  res.send(result);
};
const ProductSearch = async (req, res, next) => {
  const { city, price, additional } = req.query;
  const result = await houses
    .find({
      $and: [
        { city: city },
        { price: { $lt: price } },
        { additional: additional },
      ],
    })
    .toArray();
  if (JSON.parse(result).length < 3) {
    const newResult = await houses
      .find({ $and: [{ city: city }, { price: { $lt: price } }] })
      .toArray();
    res.send(newResult);
  }
  res.send(result);
};
const updateImage = async (req, res, next) => {
  const newImageUrl = req.newUrl;
  const id = req.body.id;
  const result = await users.updateOne(
    { _id: new ObjectId(id) },
    { $set: { imageUrl: newImageUrl } }
  );
  res.send(result);
};
module.exports = {
  createUser,
  findUser,
  updateUser,
  addToWhishList,
  blogSearch,
  ProductSearch,
  updateImage,
};
