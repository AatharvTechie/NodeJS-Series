const db = require("../util/database-util");
module.exports = class Home {
  constructor(houseName, price, location, rating, photoUrl, description) {
    this.houseName = houseName;
    this.price = price;
    this.location = location;
    this.rating = rating;
    this.photoUrl = photoUrl;
    this.description = description;
  }

  save(callback) {
    if (this.id) {
      return db.execute(
        "UPDATE homes SET houseName = ?, price = ?, location =?, rating = ?, photoUrl = ?, description = ? WHERE id = ?",
        [
          this.houseName,
          this.price,
          this.location,
          this.rating,
          this.photoUrl,
          this.description,
          this.id,
        ]
      );
    } else {
      return db.execute(
        "INSERT INTO homes (houseName, price, location, rating, photoUrl, description) VALUES (?, ?, ?, ?, ?, ?)",
        [
          this.houseName,
          this.price,
          this.location,
          this.rating,
          this.photoUrl,
          this.description,
        ]
      );
    }
  }

  static fetchAll(callback) {
    return db.execute("SELECT * FROM homes"); // fetching all homes from airbnb database
  }

  static findById(homeId, callback) {
    return db.execute("SELECT * FROM homes WHERE id= ?", [homeId]);
  }

  static deleteById(homeId, callback) {
    return db.execute("DELETE FROM homes WHERE id = ? ", [homeId]); // Sql delete query
  }
};
