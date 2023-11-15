const { ObjectId } = require("mongodb");
const {
  users,
  questions,
  houses,
  blog,
  message,
  reviews,
} = require("../omniModules/mongodb");
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
const removeFromWishList = async (req, res, next) => {
  const id = req.body.id;
  const userId = req.body.userId;
  const result = await users.updateOne(
    { _id: new ObjectId(userId) },
    { $pull: { wishlist: id } }
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
  const { city, price, region, skip } = req.query;
  console.log(req.query);
  const options = {
    projection: {
      area: 0,
      bathroom: 1,
      beds: 1,
      builtIn: 0,
      city: 1,
      comments: 0,
      description: 0,
      floor: 0,
      garage: 1,
      hostEmail: 0,
      images: 1,
      maxPeople: 0,
      price: 1,
      region: 1,
      rooms: 1,
      space: 1,
      status: 0,
      title: 1,
      _id: 1,
    },
  };
  const query = {
    city: { $regex: city, $options: "i" },
    region: { $regex: region, $options: "i" },
  };
  if (price == 0) {
    const result = await houses.find(query).limit(12).toArray();
    res.send(result);
  } else {
    const result = await houses
      .find(query)
      .sort({ price: price })
      .limit(12)
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
  data.time = new Date();
  data.status = "pending";
  const result = await questions.insertOne(data);
  res.send(result);
};
const getCard = async (req, res, next) => {
  const id = req.params.id;
  const result = await houses.findOne({ _id: new ObjectId(id) });
  res.send(result);
};
const sendMessage = async (req, res, next) => {
  const userEmail = req.body.userEmail;
  const userName = req.body.userName;
  const hostEmail = req.body.hostEmail;
  const text = req.body.text;
  const date = req.body.date;

  const data = {
    userEmail: userEmail,
    hostEmail: hostEmail,
    text: text,
    userName: userName,
    date: date,
  };
  const result = await message.insertOne(data);
  res.send(result);
};
const myMessage = async (req, res, next) => {
  const mail = req.params.mail;
  const result = await message.find({ hostEmail: mail }).toArray();
  res.send(result);
};
const postComment = async (req, res, next) => {
  let data = req.body;
  data.data = new Date();
  const result = await reviews.insertOne(data);
  const id = `${result.insertedId}`;

  const newResult = await houses.updateOne(
    { _id: new ObjectId(data.postId) },
    { $push: { comments: id } }
  );
  res.send(newResult);
};
const getComment = async (req, res, next) => {
  const id = req.params.id;
  const result = await reviews.findOne({ _id: new ObjectId(id) });
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
  removeFromWishList,
  myMessage,
  sendMessage,
  postComment,
  getComment,
};
