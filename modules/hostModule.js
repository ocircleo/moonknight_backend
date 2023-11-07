const { ObjectId } = require("mongodb");
const { houses, users } = require("../omniModules/mongodb");
const getMyHouses = async (req, res, next) => {
  const email = req.params.email;
  const result = await houses.findOne({ email: email });
  res.send(result);
};
const applyForHost = (req,res,next)=>{

}
const makeHost = async (req, res, next) => {
  const id = req.params.id;
  const result = await users.updateOne(
    { _id: new ObjectId(id) },
    { $set: { role: "host" } }
  );
};
const postHouse = async (req, res, next) => {
  const { data } = req.body;
  const result = await houses.insertOne(data);
};
const uploadHouseImage = async (req, res, next) => {
  const newImageUrl = req.newUrl;
  const id = req.body.postId;
  const result = await houses.updateOne(
    { _id: new ObjectId(id) },
    { $push: { images: newImageUrl } }
  );
  res.send(post);
};

module.exports = { uploadHouseImage, postHouse, getMyHouses, makeHost,applyForHost };
