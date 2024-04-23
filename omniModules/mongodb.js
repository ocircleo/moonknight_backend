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
const message = database.collection("message");
const blog = database.collection("blog");
const payment = database.collection("payment");
const payment_success = database.collection("paymentsuccess");
const payment_failed = database.collection("paymentfailed");
const payment_status = database.collection("paymentstatus");
module.exports = {
  users,
  houses,
  blog,
  questions,
  message,
  reviews,
  payment,
  payment_success,
  payment_failed,
  payment_status,
};
