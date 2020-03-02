const router = require("express").Router();
const isAuth = require("../config/auth").isAuth;
//* User Controllers
const RegisterUser = require("../controllers/User/registerUser");
const ViewUsers = require("../controllers/User/viewUsers");
const ViewUser = require("../controllers/User/viewUser");
const EditUser = require("../controllers/User/editUser");
const DeleteUser = require("../controllers/User/deleteUser");
const LoginUser = require("../controllers/User/loginUser");
const Trash = require("../controllers/User/Trash");
const Restore = require("../controllers/User/restore");

//* User Routes
router.post("/register-user/", isAuth, RegisterUser.registerUser);
router.get("/trash-data", isAuth, Trash.getTrash);
router.get("/view-users/", ViewUsers.viewUsers);
router.get("/view-user/:id", isAuth, ViewUser.viewUser);
router.put("/edit-user/:id", isAuth, EditUser.editUser);
router.delete("/delete-user/:id", isAuth, DeleteUser.deleteUser);
router.post("/login", LoginUser.loginUser);
router.get("/logout", LoginUser.logOut);
router.post("/restore-asset", isAuth, Restore.restoreAsset);

module.exports = router;
