const { ObjectId } = require("mongodb");
const { users, questions, houses, blog } = require("../omniModules/mongodb");
const { query } = require("express");

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
      wishlist: [],
      comments: [], //
      history: [], //
      verification: false,
      verified: false,
      age: 0,
      currentStatus: "Unkonwn",
      blocked: false,
    };
    const newResult = await users.insertOne(newUser);
  } else {
    res.send(result);
  }
};
// need to be updated
const updateUser = async (req, res, next) => {
  const body = req.body;
  const newData = {
    name: body.name,
    phone: body.phone,
    city: body.city,
    region: body.region,
    additional: body.additional,
    age: body.age,
  };
  const result = await users.updateOne(
    { _id: new ObjectId(body.id) },
    { $set: newData },
    { upsert: true }
  );
  res.send(result);
};
const addToWhishList = async (req, res, next) => {
  const id = req.body.id;
  const userId = req.body.userId;
  const result = await users.updateOne(
    { _id: new ObjectId(userId) },
    { $push: { wishlist: id } }
  );
  res.send(result);
};
const getAllBlog = async (req, res, next) => {
  const result = await blog.find().toArray();
  res.send(result);
};
const blogSearch = async (req, res, next) => {
  const text = req.params.search;
  const result = await blog
    .find({ title: { $regex: text, $options: "i" } })
    .toArray();
  res.send(result);
};
const singleBlog = async (req, res, next) => {
  const id = req.params.id;
  const result = await blog.findOne({ _id: new ObjectId(id) });
  res.send(result);
};
const ProductSearch = async (req, res, next) => {
  const { city, price, region } = req.query;
  console.log(req.query);
  if (price == 0) {
    const result = await houses
      .find({
        city: { $regex: city, $options: "i" },
        region: { $regex: region, $options: "i" },
      })
      .toArray();
    res.send(result);
  } else {
    const result = await houses
      .find({
        city: { $regex: city, $options: "i" },
        region: { $regex: region, $options: "i" },
      })
      .sort({ price: price })
      .toArray();
    res.send(result);
  }
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
const contactUs = async (req, res, next) => {
  const data = req.body;
  data.body.status = "pending";
  const result = await questions.insertOne(data);
  res.send(result);
};
const getCard = async (req, res, next) => {
  const id = req.params.id;
  const result = await houses.findOne({ _id: new ObjectId(id) });
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
  contactUs,
  getCard,
  getAllBlog,
  singleBlog,
};
