const { ObjectId } = require("mongodb");
const { houses, users, blog } = require("../omniModules/mongodb");
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
const pendingPost = async (req, res, next) => {
  const result = await houses.find({ status: "pending" }).toArray();
  res.send(result);
};

const approvePost = async (req, res, next) => {
  const postId = req.body.id;
  const result = await houses.updateOne(
    { _id: new ObjectId(id) },
    { status: "approved" }
  );
  res.send(result);
};
const makeAdmin = async (req, res, next) => {
  const id = req.body.id;
  const result = await users.updateOne(
    { _id: new ObjectId(id) },
    { role: "admin" }
  );
  res.send(result);
};
const postBlog = async (req, res, next) => {
  const imgUrl = req.newUrl;
  const { title, text } = req.body;
  const time = new Date();
  const newBlog = {
    title: title,
    text: text,
    imgUrl: imgUrl,
    time: time,
  };
  const result = await blog.insertOne(newBlog);
  res.send(result);
};
module.exports = { getUsers, approvePost, pendingPost, makeAdmin, postBlog };
