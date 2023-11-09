const { ObjectId } = require("mongodb");
const { houses, users } = require("../omniModules/mongodb");
const getMyHouses = async (req, res, next) => {
  const email = req.params.email;
  const result = await houses.findOne({ email: email });
  res.send(result);
};
const applyForHost = async (req, res, next) => {
  const body = req.body;
  const id = body.id;
  delete body.id;
  const update = {
    $set: {
      name: body.name,
      phone: body.number,
      city: body.city,
      region: body.region,
      additional: body.additional,
      role: "host",
    },
  };
  const result = await users.updateOne({ _id: new ObjectId(id) }, update);
  res.send(result);
};
const postHouse = async (req, res, next) => {
  const data = req.body;
  const Post = {
    title: data.title,
    price: data.price,
    city: data.city,
    region: data.region,
    area: data.area,
    rooms: data.rooms,
    beds: data.beds,
    bathroom: data.bathroom,
    garage: data.garage || "not provided",
    builtIn: data.builtIn || "not provided",
    comments: [], //
    hostEmail: data.hostEmail,
    description: data.description,
    floor: data.floor || "not provided",
    images: [], //
    maxPeople: data.maxPeople,
    space: data.space,
    status: "pending",
  };
  const result = await houses.insertOne(Post);
  res.send(result);
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

module.exports = {
  uploadHouseImage,
  postHouse,
  getMyHouses,
  applyForHost,
};
