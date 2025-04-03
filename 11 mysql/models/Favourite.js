const db = require("../util/database-util");
module.exports = class Favourite {
  static fetchAll(callback) {
    return db.execute("SELECT * FROM homes");
  }

  static addToFavourites(homeId, callback) {
    return db.execute("ALTER TABLE  homes WHERE id = ?", [homeId]);
  }

  static deleteById(removeHomeId, callback) {
    return db.execute("DELETE FROM homes WHERE id = ?", [removeHomeId]);
  }
};
