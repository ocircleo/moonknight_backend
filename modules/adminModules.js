const { ObjectId } = require("mongodb");
const { houses, users, blog } = require("../omniModules/mongodb");
const getUsers = async (req, res, next) => {
  const sorter = req.params.type;
  console.log(sorter);
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
module.exports = { getUsers, approvePost, pendingPost, makeAdmin, postBlog };
