const { ObjectId } = require("mongodb");
const { get_db } = require("../util/database-util");
module.exports = class Home {
  constructor(houseName, price, location, rating, photoUrl, description, _id) {
    this.houseName = houseName;
    this.price = price;
    this.location = location;
    this.rating = rating;
    this.photoUrl = photoUrl;
    this.description = description;
    if (_id) {
      this._id = new ObjectId(String(_id));
    }
  }

  save() {
    let db = get_db();
    if (this._id) {
      return db
        .collection("homes")
        .updateOne({ _id: this._id }, { $set: this });
    } else {
      return db.collection("homes").insertOne(this);
    }
  }

  static fetchAll() {
    const db = get_db();
    return db.collection("homes").find().toArray();
  }

  static findById(homeId) {
    let db = get_db();
    return db
      .collection("homes")
      .find({ _id: new ObjectId(String(homeId)) })
      .next()
      .then((home) => {
        return home;
      });
  }

  static deleteById(homeId) {
    const db = get_db();
    return db
      .collection("homes")
      .deleteOne({ _id: new ObjectId(String(homeId)) });
  }
};
