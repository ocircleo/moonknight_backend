const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const cors = require("cors");
const path = require("path");
const jwt = require("jsonwebtoken");
const verifyJwt = require("./omniModules/jwt");
//routes
const userRoute = require("./routes/userRoutes");
const hostRoute = require("./routes/hostRoutes");
const adminRoute = require("./routes/adminRoutes");
const mailRoute = require("./routes/mailRoutes");
/**
 * ===================
 *
 * RAHAT, THIS IS THE SKELETON OF OUR BACKEND CODE |
 * YOU ARE ASSIGNED TO WORK ON THE HOST ROUTE ==> app.use("/user", hostRoute),app.use("/admin", adminRoute);;
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
app.get("/test", verifyJwt, async (req, res) => {
  let user = req.decoded.user;
  res.send({ data: "hello world" });
});
//Jwt token request
app.post("/jwt", (req, res) => {
  const user = req.body;
  const token = jwt.sign(user, process.env.ACCES_TOKEN_SECRET, {
    expiresIn: "24h",
  });
  res.send({ token });
});

//routes
app.use("/user", userRoute); //Salman will work
app.use("/host", hostRoute);
app.use("/admin", adminRoute); //Rahat will work
app.use("/mail", mailRoute);
// default route for error handling
app.use((req, res) => {
  res.status(404).send("<h1> 404! not a route</h1>");
});
app.listen(port, () => {
  console.log(`app is running at port http://localhost:3000/ port ${port}`);
});
