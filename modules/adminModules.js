const { ObjectId } = require("mongodb");
const { houses, users, blog, questions } = require("../omniModules/mongodb");
const getUsers = async (req, res, next) => {
  const sorter = req.params.type;
  let result;
  if (sorter == "all") {
    result = await users.find().toArray();
    res.send(result);
    return;
  }
  result = await users.find({ role: sorter }).toArray();
  res.send(result);
};
const searchUser = async (req, res, next) => {
  const searchBy = req.query.filter;
  const value = req.query.data;
  let result;
  if (searchBy == "email") {
    result = await users.findOne({ email: value });
  } else {
    result = await users.findOne({ phone: value });
  }
  res.send(result);
};
const pendingPost = async (req, res, next) => {
  const result = await houses.find({ status: "pending" }).toArray();
  res.send(result);
};

const approvePost = async (req, res, next) => {
  const id = req.params.id;
  const result = await houses.updateOne(
    { _id: new ObjectId(id) },
    { $set: { status: "approved" } }
  );
  res.send(result);
};
const denyPost = async (req, res, next) => {
  const id = req.params.id;
  const result = await houses.updateOne(
    { _id: new ObjectId(id) },
    { $set: { status: "denied" } }
  );
  res.send(result);
};

const makeAdmin = async (req, res, next) => {
  const id = req.params.id;
  const result = await users.updateOne(
    { _id: new ObjectId(id) },
    { $set: { role: "admin" } }
  );
  res.send(result);
};
const postBlog = async (req, res, next) => {
  const imgUrl = req.newUrl;
  const data = req.body.name;
  const time = new Date();
  const newBlog = {
    postedBy: req.body.id,
    title: req.body.title,
    description: req.body.description,
    imgUrl: imgUrl,
    time: time,
  };
  const result = await blog.insertOne(newBlog);
  res.send(result);
};
const blockUser = async (req, res, next) => {
  const id = req.params.id;
  const result = await users.updateOne(
    { _id: new ObjectId(id) },
    { $set: { blocked: true } },
    { upsert: true }
  );
  res.send(result);
};
const getEmail = async (req, res, next) => {
  const result = await questions.find({ status: "pending" }).toArray();
  res.send(result);
};
const deleteEmail = async (req, res, next) => {
  const id = req.params.id;
  console.log(id);
  const result = await questions.updateOne(
    { _id: new ObjectId(id) },
    { $set: { status: "replied" } }
  );
  res.send(result);
};
module.exports = {
  getUsers,
  approvePost,
  pendingPost,
  makeAdmin,
  postBlog,
  blockUser,
  denyPost,
  getEmail,
  deleteEmail,
  searchUser,
};
