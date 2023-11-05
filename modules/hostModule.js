const { ObjectId } = require("mongodb");
const { houses } = require("../omniModules/mongodb");
const getMyHouses = async (req, res, next) => {
  const email = req.params.email;
  const result = await houses.findOne({ email: email });
  res.send(result);
};
const makeHost = async (req,res,next)=>{
const id = req.params.id;
const 
}
const postHouse = async (req, res, next) => {
  const { data } = req.body;
  const result = await houses.insertOne(data);
};
const uploadHouseImage = async (req, res, next) => {
  const newImageUrl = req.newUrl;
  const id = req.body.id;
  const result = await houses.updateOne(
    { _id: new ObjectId(id) },
    { $push: { images: newImageUrl } }
  );
  res.send(post);
};

module.exports = { uploadHouseImage, postHouse, getMyHouses,makeHost };
