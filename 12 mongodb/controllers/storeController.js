const Favourite = require("../models/Favourite");
const Home = require("./../models/Home");

exports.getIndex = (req, res, next) => {
  Home.fetchAll()
    .then((registeredHomes) => {
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
  Home.fetchAll().then((registeredHomes) => {
    res.render("store/homes", {
      homes: registeredHomes,
      pageTitle: "Hosted Homes",
    });
  });
};

exports.getFavourites = (req, res, next) => {
  Favourite.fetchAll()
    .then((favouritesIds) => {
      // Extract home IDs from favourites
      const favouritesIdsArray = favouritesIds.map((fav) => fav.homeId);

      return Home.fetchAll().then((registeredHomes) => {
        // Filter registered homes to include only favourites
        const favouriteHomes = registeredHomes.filter((home) =>
          favouritesIdsArray.includes(home._id.toString())
        );

        // Render the page with the filtered homes
        res.render("store/favourites", {
          homes: favouriteHomes,
          pageTitle: "Favourites",
        });
      });
    })
    .catch((err) => {
      console.error("Failed to fetch favourites:", err);
      res.status(500).send("Internal Server Error");
    });
};

exports.postAddFavourites = (req, res, next) => {
  const homeId = req.body.id;
  const favouriteHome = new Favourite(homeId);
  favouriteHome
    .addToFavourites()
    .then((result) => {
      console.log(result);
    })
    .catch((err) => {
      console.log("Error while adding to favourites", err);
    })
    .finally(() => {
      res.redirect("/favourites");
    });
};

exports.postRemoveFavourite = (req, res) => {
  const delHomeId = req.params.homeId;
  Favourite.deleteById(delHomeId)
    .then(() => {
      res.redirect("/favourites");
    })
    .catch((err) => {
      console.log("Error while deleting from favourites", err);
    });
};

exports.getHomeDetails = (req, res, next) => {
  const homeId = req.params.homeIdentity;
  Home.findById(homeId).then((home) => {
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
