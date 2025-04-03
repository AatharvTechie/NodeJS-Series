const Favourite = require("../models/Favourite");
const Home = require("./../models/Home");

exports.getIndex = (req, res, next) => {
  Home.fetchAll()
    .then(([registeredHomes]) => {
      res.render("store/index", {
        homes: registeredHomes,
        pageTitle: "airbnb Homes",
      });
    })
    .catch((err) => {
      console.log("process failed:", err);
    });
};

exports.getHomes = (req, res, next) => {
  Home.fetchAll().then(([registeredHomes]) => {
    res.render("store/homes", {
      homes: registeredHomes,
      pageTitle: "Hosted Homes",
    });
  });
};

exports.getFavourites = (req, res, next) => {
  Favourite.fetchAll((error) => {
    if (error) {
      console.log("Error:", error);
    } else {
      return res.redirect("/homes");
    }
  })
    .then(([favourites]) => {
      res.render("/favourites");
    })
    .catch((error) => {
      console.log("something went wrong", error);
    });
};

exports.postAddFavourites = (req, res, next) => {
  const homeId = req.body.id;
  Favourite.addToFavourites(homeId, (error) => {
    if (error) {
      console.log("Error while adding to favourites", error);
    }
    res.redirect("/favourites");
  });
};

exports.postRemoveFavourite = (req, res) => {
  const homeId = req.params.homeId;
  Favourite.deleteById(homeId, (error) => {
    if (error) {
      console.log("Error to delete from favourites", error);
      return;
    }
    res.redirect("/favourites");
  });
};

exports.getHomeDetails = (req, res, next) => {
  const homeId = req.params.homeIdentity;
  Home.findById(homeId).then(([homes]) => {
    const home = homes[0];
    if (!home) {
      console.log("Home not found");
      return res.redirect("/homes");
    } else {
      res.render("store/home-detail", {
        home: home,
        pageTitle: "Home Detail",
      });
    }
  });
};
