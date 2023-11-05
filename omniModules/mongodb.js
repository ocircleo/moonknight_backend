const { MongoClient, ServerApiVersion } = require("mongodb");
require("dotenv").config();

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@ocircleo.zgezjlp.mongodb.net/?retryWrites=true&w=majority`;
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});
const database = client.db("moonknight");
const users = database.collection("users");
const houses = database.collection("houses");
const reviews = database.collection("reviews");
const reports = database.collection("reports");
const questions = database.collection("question");
const blog = database.collection("blog");
module.exports = { users, houses, blog };
async function mongoTest() {
  try {
    // await client.connect();
    // await client.db("admin").command({ ping: 1 });
    // console.log("Pinged your deployment. Lets do some manipulation!");
  } finally {
    // await client.close();
  }
}
mongoTest().catch(console.dir);
