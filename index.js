const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const userRoute = require("./routes/userRoutes");
const moderatorRoute = require("./routes/moderatorRoutes");
const adminRoute = require("./routes/adminRoutes");
const path = require("path");
//middleware
app.use(express.json());
require("dotenv").config();

//routes
app.use("/user", userRoute);
app.use("/moderator", moderatorRoute);
app.use("/admin", adminRoute);

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "/index.html"));
});
// default route for error handling
app.use((req, res) => {
  res.status(404).send("<h1> 404! not a route</h1>");
});
app.listen(port, () => {
  console.log(`app is running at port http://localhost:3000/ port ${port}`);
});
