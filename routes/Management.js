const router = require("express").Router();
const isAuth = require("../config/auth").isAuth;
//* Management Controllers
const accommodateAsset = require("../controllers/Management/accommodateAsset");
const viewAccommodations = require("../controllers/Management/viewAccommodations");
const singleViewAccommodation = require("../controllers/Management/singleViewAccommodation");
const returnAsset = require("../controllers/Management/returnAsset");
const deleteAsset = require("../controllers/Management/deleteAccommodate");
const editAccommodation = require("../controllers/Management/editAccommodate");

//* Management Routes
router.post("/accommodate-asset", isAuth, accommodateAsset.addAccommodate);
router.get("/view-accommodate", isAuth, viewAccommodations.viewAccommodations);
router.get(
  "/view-accommodate/:id",
  isAuth,
  singleViewAccommodation.singleViewAccommodation
);

router.put("/return-asset/:id", isAuth, returnAsset.returnAsset);
router.post("/delete-accommodation/:id", isAuth, deleteAsset.deleteAccommodate);
router.put(
  "/edit-accommodation/:id",
  isAuth,
  editAccommodation.editAccommodation
);
router.put("/return-single-asset/:id", isAuth, returnAsset.returnSingleAsset);

module.exports = router;
