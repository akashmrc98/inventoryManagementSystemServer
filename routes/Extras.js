const router = require("express").Router();
const isAuth = require("../config/auth").isAuth;

//* Extras Controllers
const all_csv = require("../controllers/Extras/all_csv");

//* Extras Routes
router.get("/all_csv", isAuth, all_csv.all_csvs);
router.get("/assets-csv", isAuth, all_csv.getAssetsCsv);
router.get("/managements-csv", isAuth, all_csv.getManagementsCsv);
router.get("/recycles-csv", isAuth, all_csv.getRecyclesCsv);
router.get("/users-csv", isAuth, all_csv.getUsersCsv);

module.exports = router;
