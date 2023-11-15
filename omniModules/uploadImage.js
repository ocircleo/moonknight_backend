const {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} = require("firebase/storage");
const app = require("./app");
const storage = getStorage(app);

const uploadImage = async (req, res, next) => {
  const id = req.body.id;
  const storageRef = ref(
    storage,
    `houses/${id}/${Date.now() + req.file.originalname}`
  );
  const metadata = {
    contentType: req.file.mimetype,
  };
  const snapshot = await uploadBytesResumable(
    storageRef,
    req.file.buffer,
    metadata
  );
  const downloadUrl = await getDownloadURL(snapshot.ref);
  req.newUrl = downloadUrl;
  next();
};
module.exports = uploadImage;
