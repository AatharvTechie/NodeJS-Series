const { get_db } = require("../util/database-util");
module.exports = class Favourite {
  constructor(homeId) {
    this.homeId = homeId;
  }

  static fetchAll() {
    const db = get_db();
    return db.collection("favourites").find().toArray();
  }

  addToFavourites() {
    const db = get_db();
    return db
      .collection("favourites")
      .findOne({ homeId: this.homeId })
      .then((existingHome) => {
        if (!existingHome) {
          return db.collection("favourites").insertOne(this);
        }
        return Promise.resolve();
      });
  }

  static deleteById(delHomeId) {
    const db = get_db();
    return db.collection("favourites").deleteOne({ homeId: delHomeId });
  }
};
