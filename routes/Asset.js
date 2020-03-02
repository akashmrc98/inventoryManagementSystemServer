const router = require("express").Router();
const isAuth = require("../config/auth").isAuth;

//*Asset Controllers
const AddAsset = require("../controllers/Assets/addAsset");
const ViewAsset = require("../controllers/Assets/viewAssets");
const EditAsset = require("../controllers/Assets/editAsset");
const DeleteAsset = require("../controllers/Assets/deleteAsset");

//* Asset Routes
router.post("/add-asset", isAuth, AddAsset.addAsset);
router.get("/view-assets", isAuth, ViewAsset.viewAssets);
router.get("/edit-asset/:id", isAuth, EditAsset.editMode);
router.put("/edit-asset/:id", isAuth, EditAsset.editPut);
router.put("/delete-asset/:id", isAuth, DeleteAsset.deleteAsset);

//* Product Controllers
const AddProduct = require("../controllers/Products/addProduct");
const ViewProduct = require("../controllers/Products/viewProduct");
const SnapShotProduct = require("../controllers/Products/snapShotProduct");
const EditProduct = require("../controllers/Products/editProduct");
const DeleteProduct = require("../controllers/Products/deleteProduct");

//* Product Routes
router.post("/add-product/:id", isAuth, AddProduct.addProduct);
router.get("/view-products/:id", isAuth, ViewProduct.viewProducts);
router.post("/snap-product/:id", isAuth, SnapShotProduct.snapProduct);
router.post("/edit-product/:id", isAuth, EditProduct.editProduct);
router.put("/delete-product/:id", isAuth, DeleteProduct.deleteProduct);

//* Service Controllers
const AddService = require("../controllers/Services/addServices");
const ViewServices = require("../controllers/Services/viewServices");
const SnapShotService = require("../controllers/Services/snapShotService");
const EditService = require("../controllers/Services/editServices");
const DeleteService = require("../controllers/Services/deleteServices");

//* Service Routes
router.post("/add-service/:id", isAuth, AddService.addServices);
router.get("/view-services/:id", isAuth, ViewServices.viewServices);
router.post("/snap-service/:id", isAuth, SnapShotService.snapService);
router.put("/edit-service/:id", isAuth, EditService.editService);
router.put("/delete-service/:id", isAuth, DeleteService.deleteService);

//* Dashboard Controller
const Dashboard = require("../controllers/Dashboard/Dashboard");
const viewUnReturned = require("../controllers/Dashboard/viewUnReturnedAsset");
const Returned = require("../controllers/Dashboard/returnedAssets");
const Damaged = require("../controllers/Dashboard/damagedAssets");

//* Dashboard Routes
router.get("/dashboard/", isAuth, Dashboard.dashBoard);
router.get("/view-unreturned-assets", isAuth, viewUnReturned.viewUnReturned);
router.get("/view-returned-assets", isAuth, Returned.viewReturned);
router.get("/view-damaged-assets", isAuth, Damaged.DamagedAsset);

module.exports = router;
