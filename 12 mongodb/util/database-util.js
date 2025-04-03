const mongo = require("mongodb");

const MongoClient = mongo.MongoClient;
const MONGO_URL =
  "mongodb+srv://root:root@kgcluster.aeoyl.mongodb.net/?retryWrites=true&w=majority&authSource=admin";

let _db;
const mongoConnect = (callback) => {
  MongoClient.connect(MONGO_URL)
    .then((client) => {
      console.log(client);
      console.log("connecting to database");
      _db = client.db("airbnb");
      callback();
    })
    .catch((err) => {
      console.log("Error while connecting: " + err);
    });
};

const get_db = () => {
  if (!_db) {
    throw new Error("database connection failed");
  }
  return _db;
};

exports.mongoConnect = mongoConnect;
exports.get_db = get_db;
