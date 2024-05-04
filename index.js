const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const cors = require("cors");
const path = require("path");
const jwt = require("jsonwebtoken");
const { MongoClient } = require("mongodb");
//routes
const userRoute = require("./routes/userRoutes");
const hostRoute = require("./routes/hostRoutes");
const adminRoute = require("./routes/adminRoutes");
const mailRoute = require("./routes/mailRoutes");
const paymentRouter = require("./routes/paymentRoute");
/**
 * ===================
 *
 *
 * PLEASE SWITCH TO DEV BRANCH BEFORE ANY WORK
 *
 * ====================
 */
//middleware
app.use(express.json());
require("dotenv").config();
app.use(cors());

//home page of apis
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "/index.html"));
});

//test route for mongodb
app.get("/test", async (req, res) => {
  const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@ocircleo.zgezjlp.mongodb.net/?retryWrites=true&w=majority`;
  const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  await client.connect();
  if (client.isConnected()) {
    console.log("Connected to MongoDB");
  } else {
    console.log("Not connected to MongoDB");
  }
});
//Jwt token request
app.post("/jwt", (req, res) => {
  const { user } = req.body;
  const token = jwt.sign({ email: user }, process.env.ACCES_TOKEN_SECRET, {
    expiresIn: "24h",
  });
  res.send({ token });
});

//routes
app.use("/user", userRoute);
app.use("/host", hostRoute);
app.use("/admin", adminRoute);
app.use("/mail", mailRoute);
app.use("/pay", paymentRouter);
// default route for error handling
app.use((req, res) => {
  res.status(404).send("<h1> 404! not a route</h1>");
});
// paymentCheck();
app.listen(port, () => {
  console.log(`app is running at port http://localhost:3000/ port ${port}`);
});
